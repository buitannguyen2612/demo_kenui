import { process, State } from '@progress/kendo-data-query';
import { Button } from '@progress/kendo-react-buttons';
import { getter } from '@progress/kendo-react-common';
import { setGroupIds } from '@progress/kendo-react-data-tools';
import { GridColumn as Column, Grid, GridColumnMenuFilter, GridColumnMenuGroup, GridColumnMenuProps, GridColumnMenuSort, GridCustomCellProps, GridDataStateChangeEvent, GridHeaderSelectionChangeEvent, GridSelectionChangeEvent, GridToolbar } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';
import { listUser } from './mockData';
import PopupForm from '../../components/popup/page';
import FormAddUser from '../../components/addUserForm/page';
import { getAllUser } from '../../rest/api/adminApi';
import { AxiosResponse } from 'axios';
import { IListUserReponse, IRegisterPayload } from '../../rest/IApi/IAuthentication';


const SELECTED_FIELD = "selected";

// * Default prop using for showing edit of the column
const ColumnMenu = (props: GridColumnMenuProps): JSX.Element => {
    return (
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter {...props} />
            <GridColumnMenuGroup {...props} />
        </div>
    );
};


// * Custom for actions column cell
const CustomColumn = (props: GridCustomCellProps): JSX.Element => {
    return (
        <td className='flex gap-2'>
            <Button themeColor={"primary"} onClick={() => console.log('data edit', props)}>
                Edit
            </Button>
            <Button onClick={() => console.log('data edit', props)}>
                Remove
            </Button>
        </td>
    )
}


// todo: Trước mắt thì hàm này sẽ hỗ trợ grouping, nhưng hiện tại chưa thấy tác dụng của nó
// todo: trong case này thì mình sẽ sử dụng process trực tiếp cho nhanh
const processWithGroups = (data: any, dataState: State) => {
    const newDataState = process(data, dataState);
    setGroupIds({ data: newDataState.data, group: dataState.group });
    return newDataState;
};

// * Atribute of the grid tab, for showing all of feature about navigate
const initialDataState: State = {
    take: 10,
    skip: 0,
    group: [],
};

export interface IUser {
    id: number;
    fullName: string;
    email: string;
    listTodo?: number;
}

type Props = {}


const UserManage = (props: Props) => {
    // * Always get the id when passing the object into this
    const idGetter = getter("_id")


    const [poupAdd, setPopupAdd] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<Array<IListUserReponse>>([])
    const [filterValue, setFilterValue] = useState()
    const [dataState, setDataState] = useState<State>(initialDataState)
    const [filterData, setFilterData] = useState<Array<IListUserReponse>>(currentData)
    const [mockData, setMockData] = useState<Array<IListUserReponse>>(filterData)
    const [dataResult, setDataResult] = useState(process(filterData, dataState)) // * Process will store the the object total Array and Current array
    const [currenSelected, setCurrentSelected] = useState<{ [id: string]: boolean | number[] }>({})


    // * Handle when user navigate or sorting table
    // * event.dataState is initialDataState like {skil and sort,...}
    // * processData mean new process will be adding, and get it to current list result array
    const dataStateChange = (event: GridDataStateChangeEvent) => {
        let processData = process(filterData, event.dataState)

        //ở đây cần có hàm để xử lý việc thay đổi kiểu hiển thị sẽ không ảnh hưởng đến việc select
        processData.data = processData.data.map(val => ({
            ...val,
            selected: currenSelected[idGetter(val)]
        }))
        // Sau khi xử lý xong lưu thẳng trực tiếp vào data của process

        setDataState(event.dataState)
        setDataResult(processData)
    }

    // * Handle "tick box" in the header of the column then getting all of the field in the row
    const onHeaderSelectionChange = React.useCallback(
        (event: GridHeaderSelectionChangeEvent) => {
            const checkboxElement: any = event.syntheticEvent.target
            const isCheked = checkboxElement.checked

            // store value selected in state
            const selectAll: any = {}
            mockData.forEach(val => {
                selectAll[idGetter(val)] = isCheked
            })
            setCurrentSelected(selectAll)
            // store selected in state to make state not dissapear when navigating


            const newData = mockData.map(val => ({
                ...val,
                selected: isCheked
            }))
            setDataResult(process(newData, dataState))
        }
        ,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [mockData, dataState]
    )

    // * Handle user "tick box" on "row" of "table"
    const onSelectionChange = (event: GridSelectionChangeEvent) => {
        const idUserSelected = event.dataItem._id
        //  Adding new boolean to current id of user
        const newSelected: any = {
            ...currenSelected,
            [idUserSelected]: !currenSelected[idUserSelected]
        }
        setCurrentSelected(newSelected)

        // Base on current data, adding the boolean after seclected to new data
        const newData = mockData.map(val => ({
            ...val,
            selected: newSelected[idGetter(val)]
        }))

        setDataResult(process(newData, dataState))

    }

    // * Handle when user grouping column and then they can using expand to closing or open the group
    const onExpandChange = React.useCallback(
        (event: any) => {
            const newData = [...dataResult.data];
            const item = event.dataItem;

            if (item.groupId) {
                const targetGroup = newData.find((val) => val.groupId === item.groupId);
                if (targetGroup) {
                    targetGroup.expanded = event.value;
                    setDataResult({
                        ...dataResult,
                        data: newData,
                    });
                }
            } else {
                item.expanded = event.value;
                setDataResult({
                    ...dataResult,
                    data: newData,
                });
            }
        },
        [dataResult]
    );

    // * Handle filter data in table
    const onFilterChange = (ev: any) => {
        let value = ev.value;
        setFilterValue(ev.value);
        const newData = currentData.filter((item) => {
            let match = false;

            for (const property in item) {
                const propertyValue = item[property as keyof IListUserReponse];
                if (typeof propertyValue === 'string' && propertyValue.toLocaleLowerCase().indexOf(value) >= 0) {
                    match = true;
                }
                if (typeof propertyValue === 'number' && propertyValue.toString().indexOf(value) >= 0) {
                    match = true;
                }
            }

            return match;
        });
        setFilterData(newData);
        let clearedPagerDataState = { ...dataState, take: 8, skip: 0 };
        let processedData = process(newData, clearedPagerDataState);
        processedData.data = processedData.data.map((item) => ({
            ...item,
            selected: currenSelected[idGetter(item)],
        }));
        setDataResult(processedData);
        setDataState(clearedPagerDataState);
        setMockData(newData);
    };

    // * Popup adding new data
    const triggerAdd = () => setPopupAdd(true)

    // * trigger close add popup
    const triggerClosAdd = () => setPopupAdd(false)

    // * Fetch add new user 
    const addNew = (data: IRegisterPayload) => {
        setPopupAdd(false)
        // Todo: adding axios calling api here
        // Todo: remove user
        // Todo: update user
    }

    // *Fetch all user
    const fetchAllUser = () => {
        getAllUser().then((res: AxiosResponse<Array<IListUserReponse>>) => {
            setCurrentData(res.data)
            setFilterData(res.data)
            setMockData(res.data)
            setDataResult(process(res.data, dataState))
        }).catch(err => console.log(err))
    }

    // * Fetch all current user
    useEffect(() => {
        fetchAllUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='w-full h-full flex justify-center items-center '>
                <Grid
                    pageable={{ pageSizes: true }}
                    data={dataResult}
                    selectedField={SELECTED_FIELD}
                    onDataStateChange={dataStateChange}
                    onSelectionChange={onSelectionChange}
                    onHeaderSelectionChange={onHeaderSelectionChange}
                    onExpandChange={onExpandChange}
                    expandField='expanded'
                    total={dataResult.total}
                    dataItemKey={'_id'}
                    sortable={true}
                    groupable={true}
                    {...dataState}
                    size={"small"}
                    className="w-[60rem] h-[30rem] overflow-auto"
                >
                    <GridToolbar>
                        <Input
                            value={filterValue}
                            onChange={onFilterChange}
                            style={{
                                border: "2px solid #ccc",
                                boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
                                width: "170px",
                                height: "30px",
                                marginRight: "10px",
                            }}
                            placeholder="Searching . . . ."
                        />
                        <div className="export-btns-container">
                            <Button
                                title="Add new"
                                themeColor={"primary"}
                                type="button"
                                onClick={() => triggerAdd()}
                            >
                                Add new
                            </Button>
                            <Button onClick={() => console.log('btn_one')}>Export to Excel</Button>
                            <Button onClick={() => console.log('btn_two')}>Export to PDF</Button>
                        </div>
                    </GridToolbar>

                    <Column
                        filterable={false}
                        field={SELECTED_FIELD}
                        width={50}
                    />

                    <Column
                        field="userName"
                        title="Full name"
                        columnMenu={ColumnMenu}
                        width="100px"
                    />
                    <Column
                        field="email"
                        title="Email"
                        columnMenu={ColumnMenu}
                        width="220px"
                    />
                    <Column
                        field="todoCount"
                        title="totalTodo"
                        columnMenu={ColumnMenu}
                        width="150px"
                    />
                    <Column
                        title="Action"
                        cell={CustomColumn}
                        width="400px"
                    />
                    {/* 
                // Todo: Adding new column, and display button "edit" and "remove"  
                // Todo: Try to see this link for see solution: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
                */}
                </Grid>
            </div>

            {/* Render popup with boolean */}
            <PopupForm isOpen={poupAdd} callBack={triggerClosAdd}>
                <FormAddUser callback={addNew} close={triggerClosAdd} />
            </PopupForm>
            {/* Render popup with boolean */}
        </>
    )
}

export default UserManage
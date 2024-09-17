import { Button } from '@progress/kendo-react-buttons';
import { GridColumn as Column, Grid, GridColumnMenuFilter, GridColumnMenuGroup, GridColumnMenuProps, GridColumnMenuSort, GridToolbar, GridCustomCellProps, GridDataStateChangeEvent, GridSelectionChangeEvent, GridHeaderSelectionChangeEvent } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import React, { useState } from 'react';
import { listUser } from './mockData'
import { process, State } from '@progress/kendo-data-query';
import { getter } from '@progress/kendo-react-common';
import { setGroupIds } from '@progress/kendo-react-data-tools';


const SELECTED_FIELD = "selected";
const editField = "inEdit";

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

interface IUser {
    id: number;
    fullName: string;
    email: string;
    listTodo: number;
}

type Props = {}


const UserManage = (props: Props) => {
    // * Always get the id when passing the object into this
    const idGetter = getter("id")

    const [filterValue, setFilterValue] = useState()
    const [dataState, setDataState] = useState<State>(initialDataState)
    const [filterData, setFilterData] = useState(listUser)
    const [mockData, setMockData] = useState(filterData)
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
    const onHeaderSelectionChange = (event: GridHeaderSelectionChangeEvent) => {
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


    // * Handle user "tick box" on "row" of "table"
    const onSelectionChange = (event: GridSelectionChangeEvent) => {
        const idUserSelected = event.dataItem.id

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
        const newData = listUser.filter((item) => {
            let match = false;

            for (const property in item) {
                const propertyValue = item[property as keyof IUser];
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


    return (
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
                dataItemKey={'id'}
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
                    field="fullName"
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
                    field="listTodo"
                    title="List Todo"
                    columnMenu={ColumnMenu}
                    width="100px"
                />
                <Column
                    title="Action"
                    cell={CustomColumn}
                    width="200px"
                />
                {/* 
                // Todo: Adding new column, and display button "edit" and "remove"  
                // Todo: Try to see this link for see solution: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
                */}
            </Grid>
        </div>
    )
}

export default UserManage
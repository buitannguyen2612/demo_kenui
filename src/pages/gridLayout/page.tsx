import * as React from "react";
import { getter } from "@progress/kendo-react-common";
import { DataResult, process, State } from "@progress/kendo-data-query";
import { Input } from "@progress/kendo-react-inputs";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Button } from "@progress/kendo-react-buttons";
import {
    BadgeCell,
    BudgetCell,
    ColumnMenu,
    PersonCell,
    ProgressCell,
    RatingCell,
    CountryCell,
} from "../../components/customcells/page";
import {
    Grid,
    GridColumn as Column,
    GridToolbar,
    GridHeaderSelectionChangeEvent,
    GridSelectionChangeEvent,
} from "@progress/kendo-react-grid";
import {
    setGroupIds,
    setExpandedState,
} from "@progress/kendo-react-data-tools";

import { employees } from "./mockData";
// import "./style.css";

const DATA_ITEM_KEY = "id";
const SELECTED_FIELD = "selected";

const initialDataState: State = {
    take: 10,
    skip: 0,
    group: [],
};

const processWithGroups = (data: any, dataState: State) => {
    const newDataState = process(data, dataState);
    setGroupIds({ data: newDataState.data, group: dataState.group });

    return newDataState;
};

interface IEmployee {
    id: number;
    full_name: string;
    engagement: number;
    job_title: string;
    country: string;
    is_online: boolean;
    rating: number;
    target: number;
    budget: number;
    phone: string;
    address: string;
    img_id: number;
    gender: string;
    image: string;
    flag: string;
}


type Props = {}

const DataTable = (props: Props) => {
    const idGetter = getter("id");

    const [filterValue, setFilterValue] = React.useState();
    const [filteredData, setFilteredData] = React.useState(employees);
    const [currentSelectedState, setCurrentSelectedState] = React.useState<{
        [id: string]: boolean | number[];
    }>({});
    const [dataState, setDataState] = React.useState<State>(initialDataState);
    const [dataResult, setDataResult] = React.useState(
        process(filteredData, dataState)
    );

    const [data, setData] = React.useState(filteredData);

    const onFilterChange = (ev: any) => {
        let value = ev.value;
        setFilterValue(ev.value);
        const newData = employees.filter((item) => {
            let match = false;

            for (const property in item) {
                const propertyValue = item[property as keyof IEmployee];
                if (typeof propertyValue === 'string' && propertyValue.toLocaleLowerCase().indexOf(value) >= 0) {
                    match = true;
                }
                //! This case will not working becasue in the json not having the 'date' type
                // if (propertyValue instanceof Date) {
                //     if (propertyValue.toLocaleDateString().indexOf(value) >= 0) {
                //         match = true;
                //         break;
                //     }
                // }
            }

            return match;
        });
        setFilteredData(newData);
        let clearedPagerDataState = { ...dataState, take: 8, skip: 0 };
        let processedData = process(newData, clearedPagerDataState);
        processedData.data = processedData.data.map((item) => ({
            ...item,
            selected: currentSelectedState[item[DATA_ITEM_KEY]],
        }));
        setDataResult(processedData);
        setDataState(clearedPagerDataState);
        setData(newData);
    };

    const [resultState, setResultState] = React.useState<DataResult>(
        processWithGroups(
            employees.map((item) => ({
                ...item,
                ["selected"]: currentSelectedState[idGetter(item)],
            })),
            initialDataState
        )
    );

    //* using for handle all of the actions of user
    const dataStateChange = (event: any) => {
        //dataState : contain all of current data, pagination, sort, filter, group
        //Usually using : skip, take, sort, filter, and group in this case
        let processedData = process(filteredData, event.dataState);
        processedData.data = processedData.data.map((item) => ({
            ...item,
            selected: currentSelectedState[item[DATA_ITEM_KEY]],
        }));
        //Re setting data after the actions of user
        setDataResult(processedData);
        setDataState(event.dataState);
    };

    //? What is this callback using for ? : Using expand the row(or group) but still not see the real think in UI
    const onExpandChange = React.useCallback(
        (event: any) => {
            const newData = [...dataResult.data];
            const item = event.dataItem;
            if (item.groupId) {
                const targetGroup = newData.find((d) => d.groupId === item.groupId);
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

    //? what is this using for ?
    const setSelectedValue: any = (data: any[]) => {
        let newData = data.map((item) => {
            if (item.items) {
                return {
                    ...item,
                    items: setSelectedValue(item.items),
                };
            } else {
                return {
                    ...item,
                    ["selected"]: currentSelectedState[idGetter(item)],
                };
            }
        });
        return newData;
    };

    //* This func is calling to expend the row
    const newData = setExpandedState({
        data: setSelectedValue(resultState.data),
        collapsedIds: [],
    });

    //* this function will calling after we select all of row 
    const onHeaderSelectionChange = React.useCallback(
        (event: GridHeaderSelectionChangeEvent) => {
            console.log('select all of row');
            const checkboxElement: any = event.syntheticEvent.target;
            const checked = checkboxElement.checked;
            console.log(checked);

            const newSelectedState: any = {};
            data.forEach((item) => {
                newSelectedState[idGetter(item)] = checked;
            });

            setCurrentSelectedState(newSelectedState);

            const newData = data.map((item) => ({
                ...item,
                [SELECTED_FIELD]: checked,
            }));

            const newDataResult = processWithGroups(newData, dataState);
            setDataResult(newDataResult);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data, dataState]
    );


    //* Find the row data is checked or not and passing it to current state
    const onSelectionChange = (event: GridSelectionChangeEvent) => {
        const selectedProductId = event.dataItem.id;

        // Calling to state to set current selected
        const newSelectedState: any = {
            ...currentSelectedState,
            [selectedProductId]: !currentSelectedState[selectedProductId],
        };
        setCurrentSelectedState(newSelectedState);

        // Passing the selected to current data
        const newData = data.map((item) => {
            return { ...item, selected: newSelectedState[idGetter(item)] };
        });

        const newDataResult = processWithGroups(newData, dataState);
        setDataResult(newDataResult);
    };




    //* get current number of user
    const getNumberOfItems = (data: any[]) => {
        let count = 0;
        data.forEach((item) => {
            if (item.items) {
                count = count + getNumberOfItems(item.items);
            } else {
                count++;
            }
        });
        return count;
    };

    const getNumberOfSelectedItems = (data: any[]) => {
        let count = 0;
        data.forEach((item) => {
            if (item.items) {
                count = count + getNumberOfSelectedItems(item.items);
            } else {
                count = count + (item.selected == true ? 1 : 0);
            }
        });
        return count;
    };

    //* this will return true if we slected all of the row
    const checkHeaderSelectionValue = () => {
        let selectedItems = getNumberOfSelectedItems(newData);
        return newData.length > 0 && selectedItems === getNumberOfItems(newData);
    };

    let _export: any;
    const exportExcel = () => {
        _export.save();
    };

    let _pdfExport: any;
    const exportPDF = () => {
        _pdfExport.save();
    };

    return (
        <div>
            <ExcelExport
                data={employees}
                ref={(exporter) => {
                    _export = exporter;
                }}
            >
                <Grid
                    style={{ height: "500px" }}
                    pageable={{ pageSizes: true }}
                    data={dataResult}
                    sortable={true}
                    total={resultState.total}
                    onDataStateChange={dataStateChange}
                    {...dataState}
                    onExpandChange={onExpandChange}
                    expandField="expanded"
                    dataItemKey={DATA_ITEM_KEY}
                    selectedField={SELECTED_FIELD}
                    onHeaderSelectionChange={onHeaderSelectionChange}
                    onSelectionChange={onSelectionChange}
                    groupable={true}
                    size={"small"}
                    className="mt-[2rem]"
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
                            placeholder="Search in all columns..."
                        />
                        <div className="export-btns-container">
                            <Button onClick={exportExcel}>Export to Excel</Button>
                            <Button onClick={exportPDF}>Export to PDF</Button>
                        </div>
                    </GridToolbar>
                    <Column
                        filterable={false}
                        field={SELECTED_FIELD}
                        width={50}
                        headerSelectionValue={checkHeaderSelectionValue()}
                    />

                    <Column title="Employee">
                        <Column
                            field="full_name"
                            title="Contact Name"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: PersonCell,
                            }}
                            width="250px"
                        />
                        <Column
                            field="job_title"
                            title="Job Title"
                            columnMenu={ColumnMenu}
                            width="220px"
                        />
                        <Column
                            field="country"
                            title="Country"
                            cells={{
                                data: CountryCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="100px"
                        />
                        <Column
                            field="is_online"
                            title="Status"
                            filter="text"
                            cells={{
                                data: BudgetCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="100px"
                        />
                    </Column>
                    <Column title="Performance">
                        <Column
                            field="rating"
                            title="Rating"
                            cells={{
                                data: RatingCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                        <Column
                            field="target"
                            title="Engagement"
                            cells={{
                                data: ProgressCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="250px"
                        />
                        <Column
                            field="budget"
                            title="Budget"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: BudgetCell,
                            }}
                            width="230px"
                        />
                    </Column>
                    <Column title="Contacts">
                        <Column
                            field="phone"
                            title="Phone"
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                        <Column
                            field="address"
                            title="Address"
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                    </Column>
                </Grid>
            </ExcelExport>
            <GridPDFExport
                ref={(element) => {
                    _pdfExport = element;
                }}
                margin="1cm"
            >
                <Grid
                    style={{ height: "500px" }}
                    pageable={{ pageSizes: true }}
                    data={dataResult}
                    sortable={true}
                    total={resultState.total}
                    onDataStateChange={dataStateChange}
                    {...dataState}
                    onExpandChange={onExpandChange}
                    expandField="expanded"
                    dataItemKey={DATA_ITEM_KEY}
                    selectedField={SELECTED_FIELD}
                    onHeaderSelectionChange={onHeaderSelectionChange}
                    onSelectionChange={onSelectionChange}
                    groupable={true}
                    size={"small"}
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
                            placeholder="Search in all columns..."
                        />
                        <div className="export-btns-container">
                            <Button onClick={exportExcel}>Export to Excel</Button>
                            <Button>Export to PDF</Button>
                        </div>
                    </GridToolbar>
                    <Column
                        filterable={false}
                        field={SELECTED_FIELD}
                        width={50}
                        headerSelectionValue={checkHeaderSelectionValue()}
                    />
                    <Column title="Employee">
                        <Column
                            field="full_name"
                            title="Contact Name"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: CountryCell,
                            }}
                            width="250px"
                        />
                        <Column
                            field="job_title"
                            title="Job Title"
                            filter="numeric"
                            columnMenu={ColumnMenu}
                            width="220px"
                        />
                        <Column
                            field="flag"
                            title="Country"
                            filter="numeric"
                            cells={{
                                data: CountryCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="100px"
                        />
                        <Column
                            field="is_online"
                            title="Status"
                            filter="text"
                            cells={{
                                data: BadgeCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="100px"
                        />
                    </Column>
                    <Column title="Performance">
                        <Column
                            field="rating"
                            title="Rating"
                            cells={{
                                data: RatingCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                        <Column
                            field="target"
                            title="Engagement"
                            cells={{
                                data: ProgressCell,
                            }}
                            columnMenu={ColumnMenu}
                            width="250px"
                        />
                        <Column
                            field="budget"
                            title="Budget"
                            columnMenu={ColumnMenu}
                            cells={{
                                data: BudgetCell,
                            }}
                            width="230px"
                        />
                    </Column>
                    <Column title="Contacts">
                        <Column
                            field="phone"
                            title="Phone"
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                        <Column
                            field="address"
                            title="Address"
                            columnMenu={ColumnMenu}
                            width="230px"
                        />
                    </Column>
                </Grid>
            </GridPDFExport>
        </div>
    );
}

export default DataTable
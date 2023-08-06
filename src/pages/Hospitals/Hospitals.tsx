import { AppService } from "../../services/app.service";
import { useEffect, useRef, useState } from "react";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tooltip } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useAppDispatch } from "../../hooks";
import {
  modifyproviderId,
  componentToggle,
  modifyHeading,
} from "../../reducers/dashboardVals";

interface DataType {
  provider_id: number;
  name: string;
  type: string;
  state: string;
  city: string;
}

interface hospitalDetails {
  hospitalAddress: object[];
  hospitals: object[];
  hospitalInfo: object[];
  hospitalComparison: object[];
}
interface HospitalAddress {
  id: number;
  provider_id: number;
  address: string;
  city: string;
  county_name: string;
  state: string;
  zip_code: number;
}

interface Hospital {
  name: string;
  phone_number: string;
  provider_id: number;
  type: string;
}
// interface HospitalInfo {
//   id: number;
//   overall_rating: number;
//   provider_id: number;
//   ownership: string;
// }

// interface HospitalComparsion {
//   id: number;
//   provider_id: number;
//   effectiveness_of_care: string;
//   efficient_use_of_medical_imaging: string;
//   mortality: string;
//   patient_experience: string;
//   readmission: string;
//   safety_of_care: string;
//   timeliness_of_care: string;
// }

type DataIndex = keyof DataType;

const Hospitals = () => {
  const [hospitalDetails, setHospitalDetails] = useState<hospitalDetails>({
    hospitalAddress: [],
    hospitals: [],
    hospitalInfo: [],
    hospitalComparison: [],
  });
  const appService = new AppService();
  const dispatchLoginDetails = useAppDispatch();
  const dispatchStore = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const promptText = <span>Click to view Hospital details</span>;

  useEffect(() => {
    appService.getHospitalDetails().then((hospitalDetails) => {
      // console.log(hospitals);
      setHospitalDetails(hospitalDetails);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hospitalAddress: HospitalAddress[] =
    hospitalDetails.hospitalAddress as HospitalAddress[];
  const hospital: Hospital[] = hospitalDetails.hospitals as Hospital[];
  // const hopitalInfo: HospitalInfo[] =
  //   hospitalDetails.hospitalInfo as HospitalInfo[];

  // const hospitalComparison: HospitalComparsion[] =
  //   hospitalDetails.hospitalComparison as HospitalComparsion[];

  const mergedHospitalData = hospital.map((hospital) => {
    const address = hospitalAddress.find(
      (address) => address.provider_id === hospital.provider_id
    );
    const { state = "", city = "" } = address || {};
    return { ...hospital, state, city };
  });

  const newHospitals: DataType[] = mergedHospitalData.map(
    ({ provider_id, name, state, type, city }) => ({
      provider_id,
      name,
      state,
      type,
      city,
    })
  );

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "provider_id",
      dataIndex: "provider_id",
      key: "provider_id",
      ...getColumnSearchProps("provider_id"),
      sorter: (a, b) => a.provider_id - b.provider_id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (text, record) => (
        <Tooltip placement="top" title={promptText}>
          <div
            onClick={() => {
              dispatchLoginDetails(modifyproviderId(record.provider_id));
              dispatchStore(componentToggle("HospitalsInfo"));
              dispatchStore(modifyHeading("Hospitals Information"));
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
      // sorter: (a, b) => a.hospital_overall_rating - b.hospital_overall_rating,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "city",
      dataIndex: "city",
      key: "city",
      ...getColumnSearchProps("city"),
      // sorter: (a, b) => a.hospital_overall_rating - b.hospital_overall_rating,
      // sortDirections: ["descend", "ascend"],
    },
    {
      title: "state",
      dataIndex: "state",
      key: "state",
      ...getColumnSearchProps("state"),
      // sorter: (a, b) => a.state - b.state,
      // sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 4 }}>
        <h3>Information of All Hospitals</h3>
      </div>
      <Table
        dataSource={newHospitals}
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 400 }}
        size="small"
      />
      <div></div>
    </>
  );
};

export default Hospitals;

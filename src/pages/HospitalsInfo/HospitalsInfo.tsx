import { useAppSelector } from "../../hooks";
import { Badge, Descriptions } from "antd";
import { AppService } from "../../services/app.service";
import { useState, useEffect } from "react";

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
interface HospitalInfo {
  id: number;
  overall_rating: number;
  provider_id: number;
  ownership: string;
}

interface HospitalComparsion {
  id: number;
  provider_id: number;
  effectiveness_of_care: string;
  efficient_use_of_medical_imaging: string;
  mortality: string;
  patient_experience: string;
  readmission: string;
  safety_of_care: string;
  timeliness_of_care: string;
}
// interface HospitalData {
//   address: string | undefined;
//   city: string | undefined;
//   county_name: string | undefined;
//   effectiveness_of_care: string | undefined;
//   efficient_use_of_medical_imaging: string | undefined;
//   id: number | undefined;
//   mortality: string | undefined;
//   name: string | undefined;
//   overall_rating: number | undefined;
//   ownership: string | undefined;
//   patient_experience: string | undefined;
//   phone_number: string | undefined;
//   provider_id: number | undefined;
//   readmission: string | undefined;
//   safety_of_care: string | undefined;
//   state: string | undefined;
//   timeliness_of_care: string | undefined;
//   type: string | undefined;
//   zip_code: number | undefined;
// }

const HospitalsInfo = () => {
  const dashboardVals = useAppSelector((state) => state.dashboardValsreducer);
  const provider_id = Number(dashboardVals.provider_id);

  const [hospitalDetails, setHospitalDetails] = useState<hospitalDetails>({
    hospitalAddress: [],
    hospitals: [],
    hospitalInfo: [],
    hospitalComparison: [],
  });
  const appService = new AppService();
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
  const hopitalInfo: HospitalInfo[] =
    hospitalDetails.hospitalInfo as HospitalInfo[];

  const hospitalComparison: HospitalComparsion[] =
    hospitalDetails.hospitalComparison as HospitalComparsion[];

  const mergedHospitals = hospital.map((hosp) => {
    const address = hospitalAddress.find(
      (a) => a.provider_id === hosp.provider_id
    );
    const info = hopitalInfo.find((i) => i.provider_id === hosp.provider_id);
    const comparison = hospitalComparison.find(
      (c) => c.provider_id === hosp.provider_id
    );
    return { ...hosp, ...address, ...info, ...comparison };
  });
  console.log(mergedHospitals);
  const getHospitalById = (provider_id: number) => {
    return mergedHospitals.find(
      (hospital) => hospital.provider_id === provider_id
    );
  };

  const hospitalInfo = getHospitalById(provider_id);
  console.log(hospitalInfo);
  return (
    <>
      <Descriptions title="Hospital Info" bordered>
        <Descriptions.Item label="Hospital id">
          {" "}
          {dashboardVals?.provider_id}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Hospital Name" span={2}>
          {hospitalInfo?.name}
        </Descriptions.Item>
        <Descriptions.Item label="State">
          {hospitalInfo?.state}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {hospitalInfo?.address}
        </Descriptions.Item>
        <Descriptions.Item label="City" span={1}>
          {hospitalInfo?.city}
        </Descriptions.Item>
        <Descriptions.Item label="County" span={1}>
          {hospitalInfo?.county_name}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number" span={2}>
          {hospitalInfo?.phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Zip-Code" span={2}>
          {hospitalInfo?.zip_code}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={2}>
          <Badge status="processing" text={hospitalInfo?.type} />
        </Descriptions.Item>
        <Descriptions.Item label="Ownership">
          {" "}
          {hospitalInfo?.ownership}
        </Descriptions.Item>
        <Descriptions.Item label="Rating">
          {" "}
          {hospitalInfo?.overall_rating}
        </Descriptions.Item>
        <Descriptions.Item label="Patient Experience">
          {" "}
          {hospitalInfo?.patient_experience}
        </Descriptions.Item>
        <Descriptions.Item label="Effectiveness of Care">
          {hospitalInfo?.effectiveness_of_care}
        </Descriptions.Item>
        <Descriptions.Item label="Timeliness of Care">
          {" "}
          {hospitalInfo?.timeliness_of_care}
        </Descriptions.Item>
        <Descriptions.Item label="Safety of Care">
          {" "}
          {hospitalInfo?.safety_of_care}
        </Descriptions.Item>
        <Descriptions.Item label="Read Mission ">
          {" "}
          {hospitalInfo?.readmission}
        </Descriptions.Item>
        <Descriptions.Item label="Effectivess of Medical Imaging ">
          {hospitalInfo?.efficient_use_of_medical_imaging}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default HospitalsInfo;

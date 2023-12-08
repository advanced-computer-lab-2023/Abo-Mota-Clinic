import { List, Divider } from "@mui/joy";
import MedicationListItem from "./MedicationListItem";

function MedicationList({ medicines, prescriptionId }) {
  return (
    <List>
      {medicines.map((med, index) => {
        return (
          <>
            {index > 0 ? <Divider /> : null}
            <MedicationListItem {...med} prescriptionId={prescriptionId} />
          </>
        );
      })}
    </List>
  );
}

export default MedicationList;

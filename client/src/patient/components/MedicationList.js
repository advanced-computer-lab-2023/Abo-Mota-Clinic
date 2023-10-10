import { List, Divider } from '@mui/joy';
import MedicationListItem from './MedicationListItem';

function MedicationList({ medicines }) {
  return (
    <List>
      {
        medicines.map((med, index) => {
          return (
            <>
              <Divider />
              <MedicationListItem {...med} />
            </>
          );
        })
      }
    </List>
  )
}

export default MedicationList;
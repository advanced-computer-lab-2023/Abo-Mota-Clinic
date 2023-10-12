import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';


export default function OverFlowModal({list, buttonLabel, ModalTitle, isAppointment, isContact}) {
  const [layout, setLayout] = React.useState(undefined);
  const [scroll, setScroll] = React.useState(true);
  console.log(list)
  return (
    <React.Fragment>
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            setLayout('center');
          }}
          style={{color: "#757474" , padding:"0px"}}
          size='md'
        >
          {buttonLabel}
        </Button>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalOverflow>
          <ModalDialog aria-labelledby="modal-dialog-overflow" layout={layout} size="lg">
            <ModalClose />
            <Typography id="modal-dialog-overflow" level="h2" style={{marginLeft: "8px"}}>
              {ModalTitle}
            </Typography>
        
            {scroll && !isContact && (
              <List>
                {list.map((item, index) => {
                  return isAppointment? <ListItem key={index}> <span style={{ fontWeight: 'bold' }}>Date:</span> {item.formattedDate.split(",")[0]}  <span style={{ fontWeight: 'bold' }}>Time:</span> {item.formattedDate.split(",")[1]}</ListItem> :
                  <ListItem key={index} style={{marginBottom: "15px"}}><span style={{ fontWeight: 'bold' }}>Record:</span> {item.Record}  <span style={{ fontWeight: 'bold' }}>Date:</span> {item.Date}</ListItem>
                })}
              </List>
            )}

            {isContact && (
              <div style={{marginLeft: "8px"}}>
                <div><span style={{ fontWeight: 'bold' }}>Name: </span> {list.name}</div>
                <div><span style={{ fontWeight: 'bold' }}>Mobile: </span> {list.mobile}</div>
                <div><span style={{ fontWeight: 'bold' }}>Relation: </span> {list.relation}</div>
              </div>
              )}
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}

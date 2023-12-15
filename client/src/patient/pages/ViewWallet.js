import { Box, Card, Typography, Divider, Button, Avatar } from "@mui/joy";
import { useFetchPatientQuery } from "../../store/apis/patientApi";
import { useFetchWalletPatientQuery, useFetchWalletDoctorQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";

function ViewWallet({ isPatient }) {
  // const { data, error, isLoading } = useFetchPatientQuery();

  // let content;

  // if (isLoading) content = <p>Loading...</p>
  // else if (error) content = <p>{error}</p>
  // else content = <p>Welcome {data.name}</p>

  const { data: dataPatient, isFetching, isLoading } = useFetchWalletPatientQuery();
  const { data: dataDoctor, isFetching: isFetchingDoctor } = useFetchWalletDoctorQuery();

  if (isFetching || isFetchingDoctor) return <LoadingIndicator />;

  const wallet = isPatient ? dataPatient?.wallet : dataDoctor?.wallet;

  const dummy = [
    {
      date: "Jul 1, 2021",
      amount: "+ $50",
      pay: false,
    },
    {
      date: "Jun 28, 2021",
      amount: "- $20",
      pay: true,
    },
    {
      date: "Jun 25, 2021",
      amount: "+ $100",
      pay: false,
    },
    {
      date: "Jun 22, 2021",
      amount: "- $10",
      pay: true,
    },
    {
      date: "Jun 19, 2021",
      amount: "+ $75",
      pay: false,
    },
  ];

  return (
    <Box className="mx-20 my-10">
      <Card className="mb-5">
        <Box className="">
          <Typography level="title-md">Total Balance</Typography>
          <Typography level="h1" fontWeight={500}>
            {wallet} USD
          </Typography>
          <Box className="w-full flex justify-end">
            <Button variant="outlined" color="neutral">
              Charge Wallet
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box className="flex justify-center">
          <Typography level="title-sm">Payment History</Typography>
        </Box>
      </Card>

      <Typography level="title-lg" fontWeight={400}>
        Payment History
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box className="space-y-3">
        {dummy.map((item, index) => (
          <Card key={index}>
            <Box className="flex justify-between">
              <Box className="flex space-x-4">
                <Avatar alt={"X"} size="lg" />

                <Box className="mr-10">
                  <Typography level="title-md" id="card-description">
                    Dr. Jane Smith
                  </Typography>
                  <Typography level="body-sm" aria-describedby="card-description">
                    {item.date}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex items-center">
                <Typography
                  level="title-md"
                  color={item.amount.includes("+") ? "success" : "danger"}
                >
                  {item.amount}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default ViewWallet;

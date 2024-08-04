import { Button, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
  borderRadius: "10px",
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  img?: string;
  verified: boolean;
  createdAt: string;
  id: number;
};

type Props = {
  size: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AddUser = ({size, setOpen}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: FormValues) => {
      return fetch(`http://localhost:8800/api/users`,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [`allusers`]});
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const day = today.getDate();

    // Format the date as a string (e.g., "2024-08-04")
    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    const formData = {...data,createdAt: formattedDate, id: size+1};
    mutation.mutate(formData);
    setOpen(false);
  };
  return (
    <Box sx={style}>
      <Typography variant="h5" marginBottom={3}>
        Add new user
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          marginBottom={2}
        >
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                size="small"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                size="small"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                size="small"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
        </Stack>
        <Stack
          direction="row"
          flex={1}
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          marginBottom={2}
        >
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                size="small"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
              />
            )}
          />
          <Controller
            name="img"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL"
                size="small"
                variant="outlined"
              />
            )}
          />
        </Stack>
        <Controller
          name="verified"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} color="primary" />
              }
              label="Verified?"
              sx={{ marginBottom: "10px" }}
            />
          )}
        />
        <Stack>
          <Button variant="contained" type="submit">
            Add User
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddUser;

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
  title: string;
  color: string;
  producer: string;
  price: string;
  img?: string;
  inStock: boolean;
  createdAt: string;
  id: number;
};

type Props = {
  size: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProduct = ({size, setOpen}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData: FormValues) => {
      return fetch(`http://localhost:8800/api/products`,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [`allproducts`]});
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
        Add new product
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
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                size="small"
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            )}
          />
        <Controller
            name="color"
            control={control}
            defaultValue=""
            rules={{ required: "Color is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Color"
                variant="outlined"
                size="small"
                error={!!errors.color}
                helperText={errors.color ? errors.color.message : ""}
              />
            )}
          />
        <Controller
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price $23.66"
                variant="outlined"
                size="small"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
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
            name="producer"
            control={control}
            defaultValue=""
            rules={{ required: "Producer is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Producer"
                variant="outlined"
                size="small"
                error={!!errors.producer}
                helperText={errors.producer ? errors.producer.message : ""}
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
          name="inStock"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} color="primary" />
              }
              label="In Stock?"
              sx={{ marginBottom: "10px" }}
            />
          )}
        />
      <Stack>
        <Button variant="contained" type="submit">
          Add Product
        </Button>
      </Stack>
      </form>
    </Box>
  );
};

export default AddProduct;

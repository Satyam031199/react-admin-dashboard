import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProduct = () => {
  const handleSubmit = () => {
    console.log('New product added');
  }
  return (
    <Box sx={style}>
      <Typography variant="h5" marginBottom={3}>
        Add new product
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        marginBottom={2}
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="Color"
          variant="outlined"
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          size="small"
        />
      </Stack>
      <Stack
        justifyContent="space-between"
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        marginBottom={2}
      >
        <Stack spacing={2} direction='row'> 
          <TextField
            id="outlined-basic"
            label="Producer"
            variant="outlined"
            size="small"
          />
          <FormControlLabel control={<Checkbox />} label="In Stock?" />
        </Stack>
        <Button
          component="label"
          role={undefined}
          color="secondary"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
          <VisuallyHiddenInput type="file" />
        </Button>
      </Stack>
      <Stack>
        <Button variant="contained" onClick={handleSubmit}>Add Product</Button>
      </Stack>
    </Box>
  );
};

export default AddProduct;

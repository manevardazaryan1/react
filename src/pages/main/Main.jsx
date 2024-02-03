import Button from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TextField, Box, FormControl, Select, MenuItem, InputLabel, FormLabel, FormHelperText, TextareaAutosize, Alert } from '@mui/material';
import { useState } from 'react'; 
import { useFormik } from "formik";
import { useTheme } from "@mui/material/styles";
import { validationSchema } from '../../schema/validationSchema';
import { useDispatch, useSelector } from 'react-redux'
import { sendEamil } from '../../service/senEmailService';
import CheckIcon from '@mui/icons-material/Check';

function Main() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.email.status);
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(() => true);
    const handleClose = () => setOpen(() => false);

    const them = useTheme();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
            select: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const template = {message: values.message};

            dispatch(sendEamil(template));
        }
    })

    return(
    <Container >
        <Button onClick={handleClick} >Click to open modal <KeyboardArrowRightIcon /></Button>
        <Box style={{height: "80vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Typography component="h1" variant="h3">
                RECAT TASK
            </Typography>
        </Box>
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        >
        <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
            <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            >
            <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                MODAL
            </Typography>
        </Toolbar>
        </AppBar>
            <Container className="form-section" spacing={4}>
                {
                    status === "success" && 
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{marginTop: "25px"}}>
                        Message was sent successfully.
                    </Alert>
                }

                <Typography component="h2" variant="h4" textAlign="center" style={{ marginTop: "25px" }}>Form</Typography>
                <Box component="form" onSubmit={formik.handleSubmit} spacing={4} className="form" style={{width: "75%", margin: "auto", }}>
                    <TextField 
                        fullWidth
                        style={{ marginTop: "25px" }}
                        id="name"
                        name="name"
                        label="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField 
                        fullWidth
                        style={{ marginTop: "25px" }}
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        autoComplete='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <FormControl fullWidth style={{ marginTop: "25px" }}>
                        <InputLabel id="select">Select</InputLabel>
                        <Select 
                            id="selsect"
                            name="select"
                            label="Select"
                            aria-describedby='select-error'
                            error={formik.touched.select && Boolean(formik.errors.select)}
                            value={formik.values.select}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                                <MenuItem value="">Countries</MenuItem>
                                <MenuItem value="Armenia">Armenia</MenuItem>
                                <MenuItem value="Russsia">Russsia</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                        </Select>
                        <FormHelperText id="select-error" error={formik.touched.select && Boolean(formik.errors.select)}>
                            {formik.touched.select && formik.errors.select}
                        </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: "25px" }}>
                        <FormLabel id="message">Message</FormLabel>
                        <TextareaAutosize 
                            id="message"
                            name="message"
                            placeholder="Message"
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            aria-describedby="message-error"
                            minRows={5}
                            style={{
                                padding: "10px",
                                borderRadius: them.shape.borderRadius,
                                resize: "vertical",
                                borderColor: formik.touched.message && formik.errors.message ? them.palette.error.main : "",
                            }}
                        />
                        <FormHelperText id="message-error" error={formik.touched.message && Boolean(formik.errors.message)}>
                            { formik.touched.message && formik.errors.message }
                        </FormHelperText>
                    </FormControl>
                    <Button type="submit" variant="contained" style={{ marginTop: "25PX" }}>Send</Button>
                </Box>
            </Container>
        </Dialog>
    </Container>
    )
}

export default Main;
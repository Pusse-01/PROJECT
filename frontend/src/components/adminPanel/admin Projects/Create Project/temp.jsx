import React from "react";
import { Grid, Paper, Avatar, Typography, TextField, Select, MenuItem, FormControl, InputLabel, newStyles } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import "./createproject.css";
import "../loadingPage.css"
import { makeStyles } from "@material-ui/styles";
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
const paperStyle = {
  padding: "30px 20px",
  width: "600px",
  margin: "20px auto",
};
const avatarStyle = {
  backgroundColor: "blue",
};

const menuStyle = makeStyles(theme => ({
  formControl: {
    minWidth: 100
  }
}))

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class Createproject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      project: [],
      username: "",
      loading: true,
      personName:[],
    };
  }

  componentDidMount() {
    document.title = "PROJECT Projects";
    this.interval = setInterval(() => this.setState(() => {
      console.log(this.state.loading)
      if ((navigator.onLine)) {
        this.setState({
          loading: false,

        })
      }
    }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState(typeof value === 'string' ? value.split(',') : value,)
  };



  setProjectname = event => {
    this.setState({
      username: event.target.value
    });
  };

  setPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {

    if ((this.state.loading)) {
      return (
        <div class="ring1">Loading
          <span class="span1"></span>
        </div>
      )
    }

    const { project, classes,personName } = this.state;

    return (
      <div class="cretaeproject">
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="left">
              <div>
                <Avatar style={avatarStyle}>
                  <AddCircleOutlineOutlinedIcon
                    fontSize="large"
                    htmlColor="#ffffff"
                  />
                </Avatar>
              </div>

              <h1>Create project</h1>
              <Typography variant="caption">
                <p>Please fill this from to create a project</p>
              </Typography>
            </Grid>


            <TextField fullWidth label="Project Name" onChange={this.setProjectname}></TextField>
            <TextField fullWidth label="Project Description" ></TextField>


            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>

            <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiplevalue={personName}
          onChange={this.handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={this.MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>


          </Paper>
        </Grid>
      </div>
    );
  }
}

export default Createproject;

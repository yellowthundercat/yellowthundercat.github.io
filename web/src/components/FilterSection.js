import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import color from '../constant/color'

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


const styles = theme => ({
  formTitle: {
    margin: 'auto',
    paddingRight: 20,
    fontSize: 16,
    color: color.black,
    fontWeight: 500,
  },
  difficultForm: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderwraper: {
    display: 'inline-block',
    width: 270,
    marginLeft: 30,
  },
  difficultTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  optionCard: {
    padding: 20,
  },
  optionWrapper: {
    width: 470,
    margin: 'auto',
  },
  optionButton: {
    marginBottom: 10,
  },
});

const difficultLevel = [
  { label: 'kid', value: 1 },
  { label: 'beginner', value: 2 },
  { label: 'easy', value: 3 },
  { label: 'normal', value: 4 },
  { label: 'little hard', value: 5 },
]

class FilterSectionCore extends React.Component {
  valuetext = (value) => {
    return value + 'level'
  }
  render() {
    const { classes, handleChangeMode, typingMode, handleChangeDifficult } = this.props
    let isShowDifficulty = typingMode === 'Random Word'
    return (   
        <Card className={classes.optionCard}>
          {/* mode */}
          <FormControl component='fieldset'>
            <RadioGroup row aria-label='modeChoosing' name='modeChoosing' onChange={handleChangeMode} defaultValue='Random Word'>
              <Typography component='span' className={classes.formTitle} disabled>Mode</Typography>
              <FormControlLabel
                value='Random Word'
                control={<Radio color="default" />}
                label='Random Word' />
              <FormControlLabel
                value='Full Sentence'
                control={<Radio color="default" />}
                label='Full Sentence' />
            </RadioGroup>
          </FormControl>

          {/* difficulty and guide */}
          {isShowDifficulty &&
            <div>
              <div className={classes.difficultForm}>
                <Typography id="discrete-slider-always" component='span'
                  className={classes.difficultTitle}>
                  Difficulty
                </Typography>
                <div className={classes.sliderwraper}>
                  <Slider
                    defaultValue={3}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    min={1}
                    max={5}
                    marks={difficultLevel}
                    color='secondary'
                    onChangeCommitted={handleChangeDifficult}
                  />
                </div>
              </div>
              <div>
                Press 1 for listening, 2 for English dictionary, 3 for Vietnam
              </div>
            </div>
          }
        </Card>
    )
  }
}

class FilterSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isExpand: false 
    }
  }
  handleOptionButton = () => {
    let newExpand = !this.state.isExpand
    this.setState({ isExpand: newExpand })
  }
  render() {
    const { classes, handleChangeMode, typingMode, handleChangeDifficult } = this.props
    return (
      <div>
        <div className={classes.optionWrapper}>
        <Button
        variant="contained"
        onClick={this.handleOptionButton}
        className={classes.optionButton}
        endIcon={<ExpandMoreIcon />}
        >
          Option and Guide
        </Button>
        <Collapse in={this.state.isExpand}>
          <FilterSectionCore
            classes={classes}
            handleChangeMode={handleChangeMode}
            typingMode={typingMode} 
            handleChangeDifficult={handleChangeDifficult}/>
        </Collapse>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(FilterSection);
import Cell from './Cell';
import icon_survey from 'resources/images/icons/survey.png';

class QuestCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);

    this.state = {
      title: props.data.title,
      size: [this.bs.height * 0.25, this.bs.height * 0.35],
      icon: icon_survey,
      status: 'init'
    }
    this.checkUrl();
  }

}

export default QuestCell;

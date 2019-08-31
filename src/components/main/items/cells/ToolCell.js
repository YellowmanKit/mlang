import Cell from './Cell';

class ToolCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      title: props.title,
      size: [this.bs.height * 0.2, this.bs.height * 0.225],
      margin: this.bs.height * 0.0125,
      icon: props.icon,
      status: 'init'
    }
    this.checkUrl();
  }

}

export default ToolCell;

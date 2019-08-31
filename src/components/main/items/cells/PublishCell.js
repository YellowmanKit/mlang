import Cell from './Cell';
import icon_publish from 'resources/images/icons/publish.png';

class PublishCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);

    this.state = {
      title: props.data.title,
      size: [this.bs.height * 0.25, this.bs.height * 0.35],
      icon: icon_publish,
      status: 'init'
    }
    this.checkUrl();
  }

}

export default PublishCell;

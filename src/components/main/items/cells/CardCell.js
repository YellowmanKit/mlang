import Cell from './Cell';

class CardCell extends Cell {

  constructor(props){
    super(props);
    this.init(props);
    const firstLang = this.func.getLangById(this.props.data.langs[0]);
    const title = firstLang? firstLang.text: '';

    this.state = {
      title: title,
      size: [this.bs.height * 0.25, this.bs.height * 0.35],
      filename: props.data.icon,
      type: 'cardIcon',
      status: 'init'
    }
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    const firstLang = this.func.getLangById(this.props.data.langs[0]);
    const title = firstLang? firstLang.text: '';
    if(title !== this.state.title){
      this.setState({ title: title })
    }
  }

}

export default CardCell;

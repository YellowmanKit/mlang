import UI from 'components/UI';

class View extends UI {

  viewStyle(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    return {...bs, ...{
      height: bs.height * 0.92,
      position: 'relative',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white'
    }}
  }

}

export default View;

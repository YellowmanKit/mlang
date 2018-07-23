import UI from 'components/UI';

class View extends UI {

  viewStyle(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    return {...bs, ...ui.styles.view, ...{
      height: bs.height * 0.92
    }}
  }

}

export default View;

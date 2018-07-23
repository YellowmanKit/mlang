import UI from 'components/UI';

class SubView extends UI {

  subViewStyle(){
    const app = this.props.app;
    const ui = app.store.ui;
    return {...ui.basicStyle, ...ui.styles.view, ...{
      height: ui.basicStyle.height * 0.82
    }}
  }

}

export default SubView;

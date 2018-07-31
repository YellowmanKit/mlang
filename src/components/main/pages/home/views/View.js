import UI from 'components/UI';

class View extends UI {

  viewStyle(){
    return {...this.bs, ...{
      height: this.bs.height * 0.92,
      position: 'relative',
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'white'
    }}
  }

}

export default View;

import UI from 'components/UI';

class View extends UI {

  viewStyle(){
    return {...this.bs, ...{
      height: this.bs.height * 0.92,
      position: 'relative',
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflowY: 'auto',
      backgroundColor: 'white'
    }}
  }

  viewContentStyle(){
    return {
      width: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      flexShrink: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflowY: 'auto',
      backgroundColor: 'white'
    }
  }

}

export default View;

export const viewCard = (_index, _card) =>{
  return {
    type: 'viewCard',
    payload: { index: _index, project: _card}
  }
}

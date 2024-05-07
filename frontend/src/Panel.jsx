import React, {useState} from 'react'

const Panel = ({setMode}) => {
    const [isEditPolyline, setIsEditPolyline] = useState(false);

    const handleEdit = () => {
        if (isEditPolyline) setMode("CancelEdit");
        else setMode("Edit");
        setIsEditPolyline(!isEditPolyline);
    }
  return (
    <div className="buttons">
        <input type="button" value="Добавить остановку" className="element-map" onClick={() => {setMode("AddBS")}}/>
        {!isEditPolyline ? 
            (<input type="button" value="Соеденить остановки" className="element-map" onClick={handleEdit}/>) :
            (<div className='EditPoligonLines'>
                <input type="button" value="Сделать следующее соединение" onClick={() => {setMode("NextEdit")}}/>
                <input type="button" value="Применить" onClick={() => {setMode("Apply")}}/>
                <input type="button" value="Отменить" onClick={handleEdit}/>
            </div>)}
        <input type="button" value="Удалить соединения" className="element-map" onClick={() => {setMode("DeleteConn")}}/>
    </div>
  )
}

export default Panel
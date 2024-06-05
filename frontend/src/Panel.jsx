import {useState} from 'react'

// eslint-disable-next-line react/prop-types
const Panel = ({setMode}) => {
    const [isEditPolyline, setIsEditPolyline] = useState(false);
    const [isAddingBS, setIsAddingBS] = useState(false);
    const [isDelConn, setIsDelConn] = useState(false);

    const handleDel = () => {
        if (!isDelConn) setMode("DelConn");
        else setMode("ApplyDel");
        setIsAddingBS(false);
        setIsEditPolyline(false);
        setIsDelConn(!isDelConn);
    }

    const handleAdd = (word) => {
        setMode(word);
        setIsAddingBS(!isAddingBS);
        setIsEditPolyline(false);
        setIsDelConn(false);
    }

    const handleEdit = () => {
        if (isEditPolyline) setMode("CancelEdit");
        else setMode("Edit");
        setIsAddingBS(false);
        setIsEditPolyline(!isEditPolyline);
        setIsDelConn(false);
    }
  return (
    <div className="buttons">
        {!isAddingBS ?
        (<input type="button" value="Добавить остановку" className={"element-map " + (isAddingBS && "hideButton")} onClick={() => {handleAdd("AddBS")}}/>) :
        (<div className='AddBS settings'>
            <input type="button" value="Подтвердить" className='element-map' onClick={() => {handleAdd("ApplyBS")}}/>
            <input type="button" value="Удалить выбранное" className='element-map' onClick={() => {setMode("DelBS")}}/>
            <input type="button" value="Отменить" className='element-map' onClick={() => {handleAdd("CancelBS")}}/>
        </div>)
        }
        
        {!isEditPolyline ? 
            (<input type="button" value="Соеденить остановки" className="element-map" onClick={handleEdit}/>) :
            (<div className='EditPoligonLines settings'>
                <input type="button" value="Сделать следующее соединение" onClick={() => {setMode("NextEdit")}}/>
                <input type="button" value="Сохранить в БД" onClick={() => {setMode("ApplyEdit")}}/>
                <input type="button" value="Отменить" onClick={handleEdit}/>
            </div>)
        }

        {!isDelConn ?
            (<input type="button" value="Удалить соединения" className="element-map" onClick={handleDel}/>) :
            (<div className='DelConn settings'>
                <input type="button" value="Сохранить в БД" className='element-map' onClick={handleDel}/>
            </div>)
        }
    </div>
  )
}

export default Panel
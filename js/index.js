const btnEdito = document.getElementById("noteEdito")
const edito = document.getElementById("edito")
const cardOpenEdito = document.getElementById("openEditor")
const btnSalveNote = document.getElementById("btnSaveNote")
const mensage = document.getElementById("textMensage")
const ContainerNote = document.getElementById("ContainerNote")

let MensageArray = []

function HandlerNote(){  MensageArray.map((itens) => HandlerMensage(itens.content,itens.data))}

saveLocation()
HandlerNote()

function SaveMensage() {
    const Msg = mensage.value

    const NewList = {
        id: Math.floor(Math.random() * 10000),
        data: new Date(),
        content: Msg
    }
    MensageArray.push(NewList)

    HandlerMensage(Msg, NewList.data)
    mensage.value = ""
    HandlerEditor()
    localStorage.setItem("note", JSON.stringify(MensageArray))

}

function HandlerMensage(content,data) {

    ContainerNote.innerHTML += `
    <div class="bg-gray-800 w-full text-white p-3 relative overflow-hidden">
        <span>${dateFns.format(data, 'MM/DD/YYYY  hh:mm')}</span>
        <p class="text-sm leading-6 text-slate-300 my-2 text-center">${content}</p>
        <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </div>
    `
}

function saveLocation(){

    if(localStorage.getItem("note") !== null){
        MensageArray = JSON.parse(localStorage.getItem("note"))
    }
}
function HandlerEditor(){
 return edito.classList.contains("hidden") ? edito.classList.remove("hidden") : edito.classList.add("hidden")

}

function exportData() {

    const csvString = [
        ["ID", "Conteúdo", "Fixado?"],
        ...MensageArray.map((note) => [note.id, note.content])
    ].map((e) => e.join(",")).join("\n\n");

    const element = document.createElement("a");
    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
    element.download = "notes.csv"
    element.click()
}

document.getElementById("dowloand").addEventListener("click", exportData)
btnEdito.addEventListener("click", HandlerEditor)
 btnSalveNote.addEventListener("click", SaveMensage)
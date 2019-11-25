var recordatoriosSelecionados = [];
//Função para deletar lembretes
function deletarRecordatorio(){
    if(recordatoriosSelecionados.length > 0){
        var recordatoriosExistentes = localStorage.getItem("recordatorios");
        if(recordatoriosExistentes != null || recordatoriosExistentes != ""){
            var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
            for(var i = 0; i < recordatoriosSelecionados.length; i++){
                for(var j = 0; j < recordatoriosSelecionados.length; j++){
                    if(recordatoriosSelecionados[i] == recordatoriosRecuperados[j].id){
                        recordatoriosRecuperados[j].id = -1;
                    }
                }
            }
            var recordatorioTemporario = [];
            for(var i = 0; i < recordatoriosRecuperados.length; i++){
                if(recordatoriosRecuperados[i].id != -1){
                    recordatorioTemporario.push(recordatoriosRecuperados[i]);

                }
            }
            //Deletar lembrete
            if(recordatorioTemporario.length == 0){
                localStorage.setItem("recordatorios", "");
            }else{
                salvarRecordatorios(recordatorioTemporario);
            }
            mostrarRecordatorios();
            selecionarRecordatorio();
        }
    }
}
//Função para verificar se há texto
function textoValido(texto){
    if(texto == null || texto == "" || texto.length < 1){
        return false;
    }else{
        return true;
    }
}

//Funcão para exibir erros
function mostrarError(){
    var html = "";
    html += '<div class="alert alert-danger" role="alert">';
    html += 'Por favor insira algo';
    html += '</div>';

    document.getElementById('error').innerHTML = html;
    
}

//Função para limpar os erros
function limparError(){
    document.getElementById('error').innerHTML = "";

}

//Função para criar o limite
function createRecordatorio(){
    var conteudoTextArea = document.getElementById("texto").value;
    if (!textoValido(conteudoTextArea)){
        mostrarError();
        return;
    }
    limparError();

    //Variaveis para tempo
    var referencia = new Date();
    var id = referencia.getTime();
    var data = referencia.toLocaleDateString();
    var texto = conteudoTextArea;
    //JSON
    var recordatorio = {"id": id, "data":data, "texto": texto};
    //Função para comprovar se existir lembrete
    comprovarRecordatorio(recordatorio);
    document.getElementById("texto").value = "";

}

//Função para validar recordatorio
function recordarioValido(recordatorioExistentes){
    if(recordatorioExistentes == null || recordatorioExistentes == "" || typeof recordatorioExistentes == "undefined" || recordatorioExistentes == "undefined" ){
        return false;
    }else{
        return true;
    }
}
//Função para comprovar se existir lembrete
function comprovarRecordatorio(recordatorio){
    var recordatorioExistentes = localStorage.getItem("recordatorios");
    if(!recordarioValido(recordatorioExistentes)){
        var recordatorios = [];
        recordatorios.push(recordatorio);
        salvarRecordatorios(recordatorios);
    }else{
        var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);
        recordatoriosRecuperados.push(recordatorio);
        salvarRecordatorios(recordatoriosRecuperados);
    }

    mostrarRecordatorios();
}
//Função para selecionar Lembretes
function selecionarRecordatorio(){
    var recordatorios = document.getElementsByClassName("recordatorio");
    for(var i = 0; i < recordatorios.length; i++){
        document.getElementById(recordatorios[i].id).onclick = function(e){
            e.stopPropagation();
            //Caso tenha recordatorio
            if(recordatoriosSelecionados.indexOf(this.id) == -1){
                this.style.backgroundColor = "red";
                recordatoriosSelecionados.push(this.id);
            }else{
                //Caso não tenha recordatorio
                this.style.backgroundColor = "green";
                for(var b = 0; b < recordatoriosSelecionados.length; b++){
                    if(recordatoriosSelecionados[b] == this.id){
                        recordatoriosSelecionados[b] = 0;
                    }
                }
            }
            var recordatorioTemporario = [];
            for(var j = 0; j < recordatoriosSelecionados.length; j++){
                if(recordatoriosSelecionados[j] != 0){
                    recordatorioTemporario.push(recordatoriosSelecionados[j]);
                }
            }
            recordatoriosSelecionados = recordatorioTemporario;
        };
    }
}
//Função salvar lembretes
function salvarRecordatorios(recordatorios){
    var recordatoriosJSON = JSON.stringify(recordatorios);
    localStorage.setItem("recordatorios", recordatoriosJSON);
}

//Função para exibir os itens
function mostrarRecordatorios(){
    var html = "";
    var recordatorioExistentes = localStorage.getItem("recordatorios");
    if(!recordarioValido(recordatorioExistentes)){
        html = "Não existe nenhum lembrete...";
        document.getElementById("recordatorios").innerHTML = html;
    }else{
        var recordatoriosRecuperados = JSON.parse(recordatorioExistentes);
        for(var i = 0; i < recordatoriosRecuperados.length; i++){
            html += formatarRecordatorio(recordatoriosRecuperados[i]);
        }
        document.getElementById("recordatorios").innerHTML = html;
    }
}

//Função para formatar os lembretes
function formatarRecordatorio(recordatorio){
    var html = "";
    html += '<div class="recordatorio" id="'+ recordatorio.id +'">';
    html += '<div class="row">';
    html += '<div class="col-6 text-left">';
    html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + recordatorio.data + '</small>';
    html += '</div>';
    html += '<div class="col-6 text-right">';
    html += '<small><i class="fa fa-window-close" aria-hidden="true"></i></small>';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    html += '<div class="row">';
    html += '<div class="col-12">';
    html += recordatorio.texto;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<br>';
    return html;
}

document.addEventListener('DOMContentLoaded', function(){
    console.log("This work");

    document.getElementById("buttonSave").onclick = createRecordatorio;
    document.getElementById("buttonDelete").onclick = deletarRecordatorio;
    mostrarRecordatorios();
    selecionarRecordatorio();

});

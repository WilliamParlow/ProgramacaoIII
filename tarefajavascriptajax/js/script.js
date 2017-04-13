var dataUrl   = "json/data.json",
    itensHtml = "templates/item-snippet.html",
    menuHtml  = "templates/menu-snippet.html";

// função facilitadora para inserir HTML em um elemento
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

// substitui propriedade {{propName}} dentro de um
// 'template', e substitui por seu propValue
function inserePropriedade(template, propName, propValue) {
  // criar {{propName}}
  // trocar (replace), dentro de template, {{propName}} por propValue
  // retornar o template alterado
  var propriedade = "{{" + propName + "}}";
  // substitui todas as ocorrências de propriedade por propValue
  // em template
  template = template.replace(new RegExp(propriedade, "g"),
              propValue);
  return template;
}

function criaMenu(dados) {
  var htmlFinal = "";

  $ajaxUtils.sendGetRequest(menuHtml, function(menuHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html      =   menuHtml,
          titulo    =   dados[i].titulo;

      html = inserePropriedade(html, "titulo", titulo);

      htmlFinal += html;
    }
    htmlFinal += '</section>';
    insereHtml("#menuList", htmlFinal);
  }, false);

}

// Cria o conteúdo da pagina pelo itensHtml = "templates/item-snippet.html";
function criaConteudo(dados) {
  var htmlFinal = '<section class="row">'; // string que vai conter todo o HTML

  $ajaxUtils.sendGetRequest(itensHtml, function(itensHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html      =   itensHtml,
          titulo    =   dados[i].titulo,
          conteudo  =   dados[i].Conteudo;

      html = inserePropriedade(html, "titulo", titulo);
      html = inserePropriedade(html, "conteudo", conteudo);

      htmlFinal += html;
    }
    htmlFinal += '</section>';

    insereHtml("#pageContainer", htmlFinal);
  }, false);
  // construimos os itens agora
  // não é um JSON -> false

}

// constroi a pagina, com os dados recebidos por parametro
function constroiPagina(dados) {

  criaMenu(dados)
  criaConteudo(dados);
  $('#scriptContent').load("./templates/scripts.html");
}
// vamos construir o sendGetRequest:
// definir a URL (dataUrl)
// e o metodo constroiPagina
$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);

const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
    {
      question: "Qual é uma das funções essenciais dos sistemas operacionais?",
      answers: [
        { text: "Fornecer uma interface de usuário intuitiva.", correct: false },
        { text: "Gerenciar recursos de hardware e software.", correct: true },
        { text: "Desenvolver aplicativos de software.", correct: false },
        { text: "Manter a segurança da rede.", correct: false }
      ]
    },
    {
      question: "Quando múltiplas saídas de impressão estão na fila para serem impressas em uma única impressora, uma decisão tem de ser tomada sobre qual deve ser impressa em seguida. Há um compartilhamento de recursos de que maneira?",
      answers: [
        { text: "No tempo", correct: true },
        { text: "No espaço", correct: false },
        { text: "No tempo e espaço", correct: false },
        { text: "Nenhum dos itens anteriores", correct: false }
      ]
    },
    {
      question: "Em vez de os clientes se revezarem, cada um tem direito a uma parte do recurso. Por exemplo, a memória principal é normalmente dividida entre vários programas sendo executados, de modo que cada um pode ser residente ao mesmo tempo (por exemplo, a fim de se revezar usando a CPU). Há um compartilhamento de recursos de que maneira?",
      answers: [
        { text: "No tempo", correct: false },
        { text: "No espaço", correct: true },
        { text: "No tempo e espaço", correct: false },
        { text: "Nenhum dos itens anteriores", correct: false }
      ]
    },
    {
      question: "Considere as afirmações: 1. Cada CPU tem um conjunto genérico de instruções que ela consegue executar. Assim, um processador x86 pode facilmente executar programas ARM. 2. As CPUs têm alguns registradores internos para armazenamento de variáveis e resultados temporários. 3. Os registradores são importantes por causa da multiplexação de espaço da CPU.",
      answers: [
        { text: "Todas as afirmações estão corretas", correct: false },
        { text: "Somente as afirmações 1 e 2 estão corretas", correct: false },
        { text: "As afirmações 1 e 3 estão incorretas", correct: true },
        { text: "Nenhuma das afirmações estão corretas", correct: false }
      ]
    },
    {
      question: "Ordene as memórias de forma decrescente segundo o tempo de acesso",
      answers: [
        { text: "Disco magnético>Memória principal>Cache>Registradores", correct: true },
        { text: "Registradores>Cache>Memória principal>Disco magnético", correct: false },
        { text: "Memória principal>Disco magnético>Cache>Registradores", correct: false },
        { text: "Cache>Registradores>Memória principal>Disco magnético", correct: false }
      ]
    },
    {
      question: "Ordene as memórias de forma crescente segundo a capacidade",
      answers: [
        { text: "Disco magnético<Memória principal<Cache<Registradores", correct: false },
        { text: "Registradores<Cache<Memória principal<Disco magnético", correct: true },
        { text: "Memória principal<Disco magnético<Cache<Registradores", correct: false },
        { text: "Cache<Registradores<Memória principal<Disco magnético", correct: false }
      ]
    },
    {
      question: "Complete a frase: As chamadas de sistema sempre foram o meio pelo qual os programas de espaço do(a) _____ podem acessar os serviços do(a) _____",
      answers: [
        { text: "memória/cpu", correct: false },
        { text: "endereçamento/memória", correct: false },
        { text: "usuário/kernel", correct: true },
        { text: "kernel/usuário", correct: false }
      ]
    },
    {
      question: "Qual é o nome da chamada de sistema que suspende a execução do processo pai até a finalização de um processo filho?",
      answers: [
        { text: "waitpid", correct: true },
        { text: "fork", correct: false },
        { text: "execve", correct: false },
        { text: "exit", correct: false }
      ]
    },
    {
      question: "Para que serve a chamada de sistema fork?",
      answers: [
        { text: "Para iniciar um novo processo filho a partir do processo pai.", correct: true },
        { text: "Para suspender a execução do processo pai até que o processo filho termine.", correct: false },
        { text: "Para encerrar a execução de um processo filho antes de retornar ao processo pai.", correct: false },
        { text: "Para realizar a comunicação entre processos em sistemas operacionais.", correct: false }
      ]
    },
    {
      question: "Se eu executar este comando: mkdir -p novapasta/subpasta e em seguida executar outro comando rmdir novapasta, o que irá acontecer?",
      answers: [
        { text: "A novapasta e a sua subpasta será removida", correct: false },
        { text: "Somente a subpasta será removida", correct: false },
        { text: "Haverá um erro porque a novapasta não está vazia", correct: true },
        { text: "Haverá um erro porque a subpasta está vazia", correct: false }
      ]
    },
    {
      question: "Qual o comando é utilizado para mover e renomear arquivos?",
      answers: [
        { text: "cp", correct: false },
        { text: "mv", correct: true },
        { text: "mkdir", correct: false },
        { text: "rm", correct: false }
      ]
    },
    {
      question: "Para definir a proteção de arquivo -rw-r--r-- qual comando devo utilizar?",
      answers: [
        { text: "chmod 700 arquivo", correct: false },
        { text: "chmod 640 arquivo", correct: false },
        { text: "chmod 644 arquivo", correct: true },
        { text: "chmod 540 arquivo", correct: false }
      ]
    },
    {
      question: "O VirtualBox é um exemplo de:",
      answers: [
        { text: "Sistema operacional", correct: false },
        { text: "Software de virtualização, sendo um hypervisor de tipo 1", correct: false },
        { text: "Software de virtualização, sendo um hypervisor de tipo 2", correct: true },
        { text: "A letra A e C estão corretas", correct: false }
      ]
    },
    {
      question: "Quais afirmações estão corretas sobre os processos?",
      answers: [
        { text: "Um processo é apenas uma instância de um programa em execução", correct: false },
        { text: "Cada processo tem seu próprio espaço de endereçamento.", correct: false },
        { text: "Um processo contém: contador do programa e registradores", correct: false },
        { text: "Todas as afirmações estão corretas", correct: true }
      ]
    },
    {
      question: "Qual afirmação está incorreta sobre os processos?",
      answers: [
        { text: "Um processo é apenas uma instância de um programa em execução", correct: false },
        { text: "Em geral todos os processos compartilham o mesmo espaço de endereçamento", correct: true },
        { text: "Um processo contém um contador de programa lógico", correct: false },
        { text: "Processos podem ser criados e terminados dinamicamente", correct: false }
      ]
    },
    {
      question: "Qual afirmação está incorreta sobre os processos?",
      answers: [
        { text: "Os seus três estados são: execução, pronto e bloqueado", correct: false },
        { text: "Saídas normal e por erro são términos voluntários", correct: false },
        { text: "Um Erro fatal e um processo ser morto pelo comando kill são términos involuntários", correct: false },
        { text: "A não existência do arquivo para ser compilado ao se utilizar o comando g++ foo.cpp, gera um término voluntário", correct: true }
      ]
    },
    {
      question: "Sobre os estados do processo é correto afirmar",
      answers: [
        { text: "O escalonador é o responsável por alternar os processos em estados executável e pronto", correct: true },
        { text: "O estado pronto é um processo incapaz de ser executado até que algum evento externo aconteça", correct: false },
        { text: "O estado bloqueado é um processo executável, mas que está temporariamente parado pelo escalonador", correct: false },
        { text: "O escalonador é o responsável por alternar os processos em estados executável e bloqueado", correct: false }
      ]
    },
    {
        question: "Sobre os estados do processo é correto afirmar",
        answers: [
          { text: "O escalonador é o responsável por alternar os processos em estados executável e pronto", "correct": true },
          { text: "O estado pronto é um processo incapaz de ser executado até que algum evento externo aconteça", "correct": false },
          { text: "O estado bloqueado é um processo executável, mas que está temporariamente parado pelo escalonador", "correct": false },
          { text: "O escalonador é o responsável por alternar os processos em estados executável e bloqueado", "correct": false }
        ],
       
      },
      {
        question: "Sobre os estados do processo é correto afirmar",
        answers: [
          { text: "O escalonador é o responsável por alternar os processos em estados executável e pronto", correct: true },
          { text: "O estado pronto é um processo incapaz de ser executado até que algum evento externo aconteça", correct: false },
          { text: "O estado bloqueado é um processo executável, mas que está temporariamente parado pelo escalonador", correct: false },
          { text: "O escalonador é o responsável por alternar os processos em estados executável e bloqueado", correct: false }
        ]
      },
      {
        question: "Sobre o scheduling ou escalonamento de processos o que é incorreto afirmar?",
        answers: [
          { text: "O scheduling de processos é uma técnica utilizada pelos sistemas operacionais para gerenciar a execução de múltiplos processos concorrentes em um único processador.", correct: false },
          { text: "O objetivo do scheduling de processos é maximizar a eficiência do processador, garantindo um uso justo dos recursos entre os processos e minimizando o tempo de espera.", correct: false },
          { text: "Existem diversos algoritmos de escalonamento de processos, como o First-Come, First-Served (FCFS), Shortest Job Next (SJN), Round Robin (RR), entre outros, cada um com suas próprias características e desempenhos.", correct: false },
          { text: "O scheduling de processos não é uma preocupação nos sistemas operacionais modernos, uma vez que todos os processos são executados em paralelo, sem necessidade de coordenação pelo sistema operacional.", correct: true }
        ]
      },
      {
        question: "Qual a relação entre o Bloco de Controle de Processo (PCB sigla em inglês) e a mudança de contexto",
        answers: [
          { text: "O PCB é uma estrutura de dados temporária que é completamente apagada durante a mudança de contexto, assim o processo escalonado precisar ficar bloqueado para receber o contexto de outro processo", correct: false },
          { text: "O PCB é responsável pelo escalonamento do processo e executar a mudança de contexto", correct: false },
          { text: "A mudança de contexto ocorre quando o sistema operacional interrompe a execução de um processo para permitir a execução de outro. Durante essa troca, o sistema operacional salva o contexto do processo no PCB", correct: true },
          { text: "Estes termos não apresentam nenhuma relação", correct: false }
        ]
      },
      {
        question: "Quando ocorre uma condição de corrida?",
        answers: [
          { text: "Quando há um escalonamento de processo e será selecionado quais são os mais rápidos", correct: false },
          { text: "Quando dois processos querem acessar a memória compartilhada ao mesmo tempo", correct: true },
          { text: "Quando há troca de mensagens entre dois processos", correct: false },
          { text: "Quando um processo chega mais rápico em uma região crítica", correct: false }
        ]
      },
      {
        question: "Qual das afirmações está correta quando se fala em evitar as condições de corrida?",
        answers: [
          { text: "Proibir mais de um processo de ler ou escrever os dados compartilhados", correct: false },
          { text: "Em um sistemas com múltiplas CPUs, impedir que o sistema operacional escalone um dos processos", correct: false },
          { text: "Exercer a exclusão mútua, quando um processo está usando um arquivo ou variável compartilhados, os outros serão impedidos de realizar a mesma coisa.", correct: true },
          { text: "É impossível evitar condições de corrida", correct: false }
        ]
      },
      {
        question: "Quais das afirmações a seguir não é uma condição para se chegar em uma boa solução de corrida?",
        answers: [
          { text: "Em nenhum momento, dois processos podem ocupar simultaneamente suas regiões críticas.", correct: false },
          { text: "Um processo em execução fora de sua região crítica não pode bloquear nenhum outro processo.", correct: false },
          { text: "Nenhum processo deve ser forçado a aguardar indefinidamente para acessar sua região crítica.", correct: false },
          { text: "Suposição devem ser feitas a respeito de velocidades ou do número de CPUs.", correct: true }
        ]
      },
      {
        question: "Em qual critério para se chegar em uma boa solução de corridas, a desabilitação de interrupções falha?",
        answers: [
          { text: "Dois processos jamais podem estar simultaneamente dentro de suas regiões críticas.", correct: false },
          { text: "Nenhuma suposição pode ser feita a respeito de velocidades ou do número de CPUs.", correct: true },
          { text: "Nenhum processo executando fora de sua região crítica pode bloquear qualquer processo.", correct: false },
          { text: "Nenhum processo deve ser obrigado a esperar eternamente para entrar em sua região crítica.", correct: false }
        ]
      },
      {
        question: "Em qual critério para se chegar em uma boa solução de corridas, a inclusão de uma variável do tipo trava falha?",
        answers: [
          { text: "Dois processos jamais podem estar simultaneamente dentro de suas regiões críticas.", correct: true },
          { text: "Nenhuma suposição pode ser feita a respeito de velocidades ou do número de CPUs.", correct: false },
          { text: "Nenhum processo executando fora de sua região crítica pode bloquear qualquer processo.", correct: false },
          { text: "Nenhum processo deve ser obrigado a esperar eternamente para entrar em sua região crítica.", correct: false }
        ]
      },
      {
        question: "Qual a melhor solução para evitar as condições de corrida entre dois processos que se comunicam através do compartilhamento de memória?",
        answers: [
          { text: "Desabilitação de interrupções", correct: false },
          { text: "Criação de variáveis do tipo trava", correct: false },
          { text: "Solução de Peterson", correct: true },
          { text: "Alternância explícita", correct: false }
        ]
      },
      {
        question: "Em qual dos casos o processo sofreu uma interrupção forçada como resultado de uma decisão de scheduling da CPU?",
        answers: [
          { text: "Quando um processo passa do estado de execução para o estado de espera por exemplo, como resultado de uma invocação wait para o encerramento de um processo-filho", correct: false },
          { text: "Quando um processo passa do estado de execução para o estado de pronto", correct: true },
          { text: "Quando o processo recebeu um sinal do comando kill para término", correct: false },
          { text: "Quando um processo termina", correct: false }
        ]
      },
      {
        question: "Qual das afirmações a seguir está correta?",
        answers: [
          { text: "Quando um processo é executado, o registrador limite é carregado com o endereço físico onde seu programa começa na memória e o registrador base é carregado com o comprimento do programa.", correct: false },
          { text: "Usar registradores base e limite é uma maneira fácil de dar a cada processo seu próprio espaço de endereçamento", correct: true },
          { text: "Mesmo que um processo não possa crescer em memória e não há um espaço liberado para ele, nunca poderá ser morto", correct: false },
          { text: "Alocar memória extra mesmo sabendo que um processo nunca irá precisar de mais", correct: false }
        ]
      },
      {
        question: "Uma forma de lidar com a sobrecarga na movimentação dos processos, que não cabem mais em sua memória alocada, seria:",
        answers: [
          { text: "Alocar um pouco de memória extra sempre que um processo for trocado ou movido", correct: true },
          { text: "Reservar exatamente o que é necessário, nem mais nem menos, assim reduz a sobrecarga causada por alocações extras", correct: false },
          { text: "Não movimentar o processo e suspendê-lo", correct: false },
          { text: "Transferir o processo para a memória cache", correct: false }
        ]
      },
      {
        question: "No gerenciamento de memória, qual algoritmo faz a menor busca possível para a alocação de memória",
        answers: [
          { text: "Quick fit", correct: false },
          { text: "Best fit", correct: false },
          { text: "First fit", correct: true },
          { text: "Next fit", correct: false }
        ]
      },
      {
        question: "No gerenciamento de memória, qual algoritmo irá escolher o maior espaço livre",
        answers: [
          { text: "Next fit", correct: false },
          { text: "Best fit", correct: false },
          { text: "Worst fit", correct: true },
          { text: "First fit", correct: false }
        ]
      },
      {
        question: "No gerenciamento de memória, qual algoritmo irá escolher o menor espaço livre que seja adequado",
        answers: [
          { text: "Next fit", correct: false },
          { text: "Best fit", correct: true },
          { text: "Worst fit", correct: false },
          { text: "First fit", correct: false }
        ]
      }
];
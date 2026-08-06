# Arena Training — site completo

Landing page editorial criada com imagens, conteúdo e links obtidos na página oficial da Arena Training. A direção visual privilegia superfícies planas, tipografia Satoshi, fotografia real e vermelho usado como sinal de ação, evitando brilhos, vidro e excesso de cards arredondados.

## Abrir

Abra `index.html` diretamente ou execute nesta pasta:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Depois acesse `http://127.0.0.1:4173/`.

## Conteúdo

- Hero fotográfico, benefícios e indicadores sem elementos flutuantes.
- História da Arena Training.
- Estrutura e oito comodidades.
- Legado de mais de 12 anos.
- Projeto +1 sem fome.
- Planos Red e Duplo com links oficiais.
- Planos em cards horizontais inspirados no componente de pricing da Gymix, sem fotografia.
- Nove modalidades em catálogo editorial, clicáveis e com horários em modal.
- Fotografia realista própria para cada uma das nove modalidades.
- Aplicativo de treinos.
- Avaliações do Google.
- Contato, endereço, telefones, funcionamento, redes sociais e rodapé.

## Modalidades com horários

Musculação livre, Spinning, GAP, Jump, RitBox, Fitdance, Funcional Training, ABS e Muay Thai.

As modais podem ser fechadas pelo botão, pela tecla `Escape` ou clicando no fundo. O foco retorna ao card de origem.

## Arquivos principais

- `index.html`: estrutura e conteúdo.
- `styles.css`: sistema visual base, modal e responsividade.
- `gymix-exact.css`: reconstrução de alta fidelidade dos componentes e do ritmo visual da referência Gymix, adaptada à identidade Arena.
- `script.js`: menu, animações e modais de horários.
- `layout-spec.json`: análise original e especificação da revisão moderna.
- `assets-manifest.json`: origem das imagens e links oficiais.
- `image-prompts.json`: direção de arte e prompt final de cada foto gerada.
- `assets/images/`: ativos locais, sem hotlink; as modalidades ficam em `assets/images/classes/`.

## Validação

- Integridade estrutural do HTML e das folhas de estilo verificada.
- JavaScript validado sem erros de sintaxe.
- Nove cards e modais mantidos com suporte a mouse e teclado.
- Hero testada em 390×844 e 360×800: título, texto, CTA e oferta sem sobreposição ou rolagem horizontal.
- Cards de planos testados em 1280×900, 390×844 e 360×800; CTAs oficiais preservados e sem overflow horizontal.
- As nove fotografias de modalidades carregam localmente em 1122×1402.
- Contato direto por WhatsApp e telefone, sem formulário intermediário.
- Checkout do Plano Red usa o domínio atual do Sistema Pacto; Plano Duplo segue a contratação assistida oficial pelo WhatsApp.

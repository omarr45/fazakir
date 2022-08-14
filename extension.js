const vscode = require('vscode');
const axios = require('axios');

const showModal = async (popup) => {
  const response = await axios.get(
    'https://azkar-api.nawafhq.repl.co/zekr?t&json'
  );
  const zikr = response.data;
  if (popup == 'middle') {
    vscode.window.showInformationMessage(zikr.content, {
      modal: true,
      detail: 'ثوابها: ' + zikr.description.slice(0, -1),
    });
  } else {
    vscode.window.showInformationMessage(zikr.content);
  }
};

async function activate(context) {
  const config = vscode.workspace.getConfiguration('fazakir');
  const interval = config.get('interval');
  const popup = config.get('popUp');

  const intervalInMs = interval * 60 * 1000;
  //function convert minutes to milliseconds

  setInterval(async () => {
    showModal(popup);
  }, intervalInMs);

  const show = vscode.commands.registerCommand('fazakir.getAzkar', () => {
    showModal(popup);
  });

  context.subscriptions.push(show);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

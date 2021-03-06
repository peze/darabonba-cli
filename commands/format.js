'use strict';

const fs = require('fs');
const path = require('path');
const Command = require('../lib/command');
const Darabonba = require('@darabonba/parser');
const Formatter = require('../lib/formatter');
const printer = require('../lib/printer');

class FormatCommand extends Command {
  constructor() {
    super({
      name: 'format',
      alias: [],
      desc: 'format the dara source file',
      args: [
        {
          name: 'source',
          mode: 'required',
          desc: 'source file'
        }
      ],
      options: [],
    });
  }

  usage() {
    printer.println(printer.fgYellow);
    printer.println('Usage:');
    printer.println(printer.reset);
    printer.println('    dara format <filename.dara>');
    printer.println(printer.fgYellow);
    printer.println();
  }

  async exec(args, options) {
    const filePath = path.resolve(args.source);
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    const ast = Darabonba.parse(sourceCode, filePath);
    const formatter = new Formatter();
    formatter.visit(ast, 0);
    fs.writeFileSync(filePath, formatter.output);
  }
}

module.exports = new FormatCommand();

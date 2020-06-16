
require('dotenv').config();
const TB = require('thingsboard_api');
const logger = require('./src/logger');
const connectionOptions = {
  TB_HOST: process.env.TB_HOST,
  TB_PORT: process.env.TB_PORT,
  TB_USERNAME: process.env.TB_USERNAME,
  TB_PASSWORD: process.env.TB_PASSWORD
};

const machineStates = require('./src/states');
const funcs = require('./src/functions');

async function main(){
  // get all device by custom type machine
  await TB.createConnection(connectionOptions);
  const allMachines = await TB.get.allObjectsIDandKeysByType('machine', 'device', ['id', 'name']);
  if (allMachines.error){
    logger.error(`Get machines error: ${allMachines.message}`);
    return;
  }
  // ts for telemetry to start with
  let timeStart = parseInt(process.env.TIME_START, 10) || 1579194506000;
  // threshold to cancel generating telemetry
  const timeStop = parseInt(process.env.TIME_STOP, 10) || 1592324939000;
  // ts step
  const step = parseInt(process.env.STEP, 10) || 600000;

  logger.info('Generate states! Keep patience!')
  while (true) {
    for (const machine of allMachines){
      const stateCode = funcs.getRandomIntInclusive(0, 6);
      // telemetry to push
      const payload = { ...funcs.generateСurrent(0, 30, false), ...machineStates.states[stateCode], ...{ universalStateNew: stateCode }};
      const pushStatus = await TB.push.pushAttributes(machine.name, 'device', null, payload, timeStart);
      if (pushStatus.error){
        logger.error(`Push of generated telemetry error: ${pushStatus.message}`);
        break;
      }
    }
    // add period of 10 minutes for state timestamp
    timeStart += step;

    if (timeStart > timeStop){
      logger.info('Completed states generation!');
      break;
    }
  }
}

main();
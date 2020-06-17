# machine-states-generator

### States generator for custom type in thingsboard - `machine`
 - Tool is used for generating telemetry for new instances of hardware-monitoring-project

### Installation & Launch
 - Using repository:
   - Using node `12.16.1`
   - `git clone`
   - `npm i --save`
   - Set `.env` file with parameters:
      - `TB_HOST` - thingsboard host
      - `TB_PORT` - thingsboard port
      - `TB_USERNAME` - thingsboard user name, for example `tenant@thingsboard.org`
      - `TB_PASSWORD` - thingsboard user password
      - `TIME_START` - UNIX timestamp in milliseconds, `ts` property for telemetry data in thingsboard
      - `TIME_STOP` - UNIX timestamp in milliseconds, destination point to stop the generator
      - `STEP` - a step for `TIME_START` variable, in milliseconds, by default `600000` (ten minutes)  

- Using docker
   - Base image available by `docker pull kovorotniy/states-generator`
   - In `docker-compose.yml` set environment variables according to you
   - In case locally running thingsboard, use `network_mode: "host"`
   - Run by `docker-compose up -d`

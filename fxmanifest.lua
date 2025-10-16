fx_version 'cerulean'
game 'gta5'

lua54 'yes'

author 'Summit Roleplay'
description 'Summit Phone - React-based smartphone for FiveM'
version '1.0.0'

ui_page 'web/dist/index.html'

files {
  'web/dist/index.html',
  'web/dist/**/*',
  'build/client.js',
  'build/server.js'
}

client_script 'build/client.js'
server_script 'build/server.js'

dependencies {
  'qb-core',
  'ox_lib',
  'pma-voice'
}

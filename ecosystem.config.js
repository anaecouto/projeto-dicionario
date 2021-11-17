module.exports = {
    apps: [
      {
        name: 'crediban-api',
        script: 'yarn start',
        time: true,
        instances: 1,
        autorestart: true,
        max_restarts: 50,
        watch: false,
        max_memory_restart: '1G',
        env: {
          PORT= 9000, 
          TYPEORM_CONNECTION = mongodb,
          TYPEORM_URL = 'mongodb+srv://admin:golfi%21qaz2wsx3edc@cluster0.xwa0c.mongodb.net/crediban',
          TYPEORM_SYNCHRONIZE = true,
          TYPEORM_ENTITIES = 'dist/shared/infra/database/typeorm/entities/**/*.entity.js',
          TYPEORM_MIGRATIONS = 'dist/shared/infra/database/typeorm/migrations/**/*.js',
          TYPEORM_MIGRATIONS_DIR = 'src/shared/infra/database/typeorm/migrations',
          TYPEORM_ENTITIES_DIR = 'src/shared/infra/database/typeorm/entities',
          JWT_SECRET= 'bijay'
        },
      },
    ],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-54-94-0-22.sa-east-1.compute.amazonaws.com',
        key: 'Crediban.pem',
        ref: 'origin/main',
        repo: 'https://github.com/credibandigital/crediban-api',
        path: '/home/ubuntu/crediban-api',
        'post-deploy':
          'yarn install && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
        env: {
          PORT= 9000, 
          TYPEORM_CONNECTION = mongodb,
          TYPEORM_URL = 'mongodb+srv://admin:golfi%21qaz2wsx3edc@cluster0.xwa0c.mongodb.net/crediban',
          TYPEORM_SYNCHRONIZE = true,
          TYPEORM_ENTITIES = 'dist/shared/infra/database/typeorm/entities/**/*.entity.js',
          TYPEORM_MIGRATIONS = 'dist/shared/infra/database/typeorm/migrations/**/*.js',
          TYPEORM_MIGRATIONS_DIR = 'src/shared/infra/database/typeorm/migrations',
          TYPEORM_ENTITIES_DIR = 'src/shared/infra/database/typeorm/entities',
          JWT_SECRET= 'bijay'
        },
      },
    },
  }
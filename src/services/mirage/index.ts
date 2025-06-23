import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs'
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  console.log('Mirage ativado🤡🤡')
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number){
          return `User ${i + 1}`;
        },
        email(){
          return faker.internet.email().toLowerCase();
        },
        createdAt(){
          return faker.date.recent({days: 10})
        }
      })
    },
    seeds(server){
      server.createList('user', 200)
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      // Liberar tudo que começa com /_next para não quebrar o Next.js
      this.passthrough('/_next/**');
      this.passthrough('/favicon.ico');
      this.passthrough('/static/**');

      // Suas rotas Mirage
      this.get('/users', (schema, request) => {
        console.log('📍 Mirage recebeu GET /users', request.queryParams);

        const page = Number(request.queryParams.page) || 1;
        const perPage = Number(request.queryParams.per_page) || 10;

        const total = schema.all('user').length;
        const pageStart = (page - 1) * perPage;
        const pageEnd = pageStart + perPage;

        const users = schema.all('user').models.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });

      this.get('/users/:id');
      this.post('/users', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create('user', data);
      });

      // Qualquer outra rota que não seja /api, passa direto
      this.passthrough((request) => {
        return !request.url.includes('/api');
      });
    }
      })

  return server;
}
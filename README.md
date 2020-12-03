Using JHipster

https://developer.okta.com/blog/2018/10/10/react-native-spring-boot-mobile-app

mkdir backend
cd backend
jhipster import-jdl ../app.jh
sudo docker-compose -f src/main/docker/keycloak.yml up -d
./gradlew
Fix Error in backend/node_modules/@types/enzyme/index.d.ts
add
type Cheerio = cheerio.Cheerio;
now
/// <reference types="cheerio" />
type Cheerio = cheerio.Cheerio;
cd ..
ignite new HealthPoints -b ignite-jhipster
ignite new bundlerPro -b ignite-jhipster
mv HealthPoints react-native
cd react-native
ignite generate import-jdl ../app.jh
yarn start
Load Android Device in Android Studio
open another terminal for react-native
yarn android

adb reverse tcp:8080 tcp:8080
adb reverse tcp:9080 tcp:9080

#POSTGRES DB
https://linuxhint.com/postgresql_docker/
version: "3.7"
services:
  db:
    image: postgres:12.2
    restart: always
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: xxxxx
      POSTGRES_PASSWORD: xxxxx
      PGDATA: /var/lib/postgresql/data
    volumes:
      - db-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
 
  pgadmin:
    image: dpage/pgadmin4:4.28
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: codingdelightph@gmail.com
      PGADMIN_DEFAULT_PASSWORD: xxxxx
      PGADMIN_LISTEN_PORT: 80
    ports:
      - "8082:80"
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    links:
      - "db:pgsql-server"
volumes:
  db-data:
  pgadmin-data:


/home/dennis/docker/pgdev
docker-compose up -d
docker-compose down

With Real Database
./gradlew -P

sudo docker-compose -f src/main/docker/keycloak.yml up -d --remove-orphan
docker-compose -f src/main/docker/elasticsearch.yml up -d



test http://localhost:8080
login as admin/admin
login in android mobile emulator
if not working goto /backend and run ./gradlew clean then ./gradlew


Front End
backend/src/test/javascript/spec/app/entities/user-product/user-product-reducer.spec.ts

Save
/home/dennis/training/JHipster/v3/bundler-app/stage2/backend/src/main/webapp/app/entities/user-product/user-product.reducer.ts
export const ACTION_TYPES = {
  CREATE_USERPRODUCT: 'userProduct/CREATE_USERPRODUCT',
  };
/home/dennis/training/JHipster/v3/bundler-app/stage2/backend/src/main/webapp/app/entities/user-product/user-product.reducer.ts
export const createEntity: ICrudPutAction<IUserProduct> = entity => async dispatch => {
    const result = await dispatch({
      type: ACTION_TYPES.CREATE_USERPRODUCT,
      payload: axios.post(apiUrl, cleanEntity(entity)),
    });
    dispatch(getEntities());
    return result;
  };
   await store.dispatch(createEntity({ id: 1 })).then(() => expect(store.getActions()).toEqual(expectedActions));
    }
    backend/src/test/javascript/spec/app/entities/user-product/user-product-reducer.spec.ts
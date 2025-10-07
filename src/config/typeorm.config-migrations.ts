import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const dataSource = new DataSource(typeOrmConfig);
export default dataSource;
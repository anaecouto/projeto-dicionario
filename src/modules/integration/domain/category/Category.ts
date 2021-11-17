import { AggregateRoot } from 'src/shared/domain/AggregateRoot';
import { UniqueEntityID } from 'src/shared/domain/UniqueEntityID';
import { CategoryId } from './CategoryId';
import { SubCategory } from './SubCategory';

export interface CategoryProps {
  title: string,
  key: string,
  icon: string, 
  sequence: number,
  subCategories: SubCategory[];
}

export class Category extends AggregateRoot<CategoryProps>  {
  get categoryId(): CategoryId {
    return CategoryId.create(this._id);
  }

  get title(): string {
    return this.props.title;
  }

  get key(): string {
    return this.props.key;
  }

  get icon(): string {
    return this.props.icon;
  }

  get sequence(): number {
    return this.props.sequence;
  }

  get subCategories(): SubCategory[] {
    return this.props.subCategories;
  }

  private constructor(props: CategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CategoryProps, id?: UniqueEntityID): Category {
    const category = new Category(props, id);

    return category;
  }
}

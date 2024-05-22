import { INotion, ITriple } from 'nagu-triples-types';

export interface IAnnotations {
  label?: string|INotion<string>,
  comment?: string|INotion<string>,
  isDefinedBy?: string|INotion<string>|IRdfsResource,
  seeAlso?: string|INotion<string>,
  getAnnotations(): Promise<IAnnotations>,
  setAnnotations(annotations: IAnnotations): Promise<void>,
}

export interface IRdfsResource extends IAnnotations {
  iri: string|INotion<string>,
  getPropertyValues(property: IRdfProperty|string): Promise<Array<IRdfsResource>>,
  setPropertyValue(property: IRdfProperty|string, value: string | INotion<any>): Promise<ITriple>,
  removePropertyValue(property: string | IRdfProperty, value: string | INotion<any>): Promise<number>,
  types(): Promise<Array<IRdfsResource>>,
  addType (type: IRdfsResource|INotion<string>|string): Promise<ITriple>,
  removeType (type: IRdfsResource|INotion<string>|string): Promise<number>,
  init(): Promise<void>,
  destroy(): Promise<void>,
}

export interface IRdfsClass {
  instances(): Promise<Array<IRdfsResource>>;
}

export interface IRdfProperty {
  domians(): Promise<Array<IRdfsResource>>,
  addDomain(resource: IRdfsClass|INotion<string>|string): Promise<ITriple>,
  removeDomain(resource: IRdfsClass|INotion<string>|string): Promise<number>,
  ranges(): Promise<Array<IRdfsResource>>,
  addRange(resource: IRdfsResource|INotion<string>|string): Promise<ITriple>,
  removeRange(resource: IRdfsResource|INotion<string>|string): Promise<number>,
  check(): Promise<boolean>,
}
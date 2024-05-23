import { INotion, ITriple } from 'nagu-triples-types';

export type AnnotationProps = {
  label?: string|INotion<string>,
  comment?: string|INotion<string>,
  isDefinedBy?: string|INotion<string>|RdfsResourceProps,
  seeAlso?: string|INotion<string>,
}
export interface IAnnotations {
  iri: string|INotion<string>
  getAnnotations(): Promise<AnnotationProps>,
  setAnnotations(annotations: AnnotationProps): Promise<void>,
}

export type RdfsResourceProps = {
  iri: string|INotion<string>,
}
export interface IRdfsResource extends IAnnotations, AnnotationProps, RdfsResourceProps {
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
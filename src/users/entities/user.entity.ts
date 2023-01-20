import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  correo: string;

  @Prop({ type: String, required: true, maxlength: 10, minlength: 10 })
  celular: string;

  @Prop({ type: String, required: true })
  indicativo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { namespace: 'schedule' }) 
export class ScheduleGateway {

  @WebSocketServer() server: Server;

  handleConnection(client:Socket){
    console.log(`cliente conectado: ${client.id}`)
  }

  @SubscribeMessage('new_schedule')
  handleNewSchedule(@MessageBody() data: { doctorId: string, scheduleId: string }, @ConnectedSocket() client: Socket): void {
    console.log('Notificando al doctor:', data);

    // Emitir un mensaje a todos los clientes conectados en el namespace 'schedule'
    this.server.emit('new_schedule_notification', data);
  }
}

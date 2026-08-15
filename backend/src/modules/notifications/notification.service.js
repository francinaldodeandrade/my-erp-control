import { NotificationRepository }
  from "./notification.repository.js";

const repository =
  new NotificationRepository();

export class NotificationService {
  async findMany() {
    return repository.findMany();
  }

  async findById(id) {
    const notification =
      await repository.findById(id);

    if (!notification) {
      throw new Error(
        "Notificação não encontrada."
      );
    }

    return notification;
  }

  async markAsRead(id) {
    await this.findById(id);

    return repository.markAsRead(id);
  }

  async resolve(id) {
    await this.findById(id);

    return repository.resolve(id);
  }
}
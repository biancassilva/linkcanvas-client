import api from "./api";

const PREFIX = "/links";

export class LinksService {
  public async createLink({
    title,
    url,
  }: {
    title: string;
    url: string;
  }): Promise<any> {
    try {
      const { data } = await api.post(`${PREFIX}/create`, { title, url });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async getLinks(): Promise<any> {
    try {
      const { data } = await api.get(`${PREFIX}/`);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async deleteLink(id: string): Promise<any> {
    try {
      const { data } = await api.delete(`${PREFIX}/${id}`);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async updateLink(
    id: string,
    { title, url }: { title: string; url: string }
  ): Promise<any> {
    try {
      const { data } = await api.put(`${PREFIX}/${id}`, { title, url });
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class YtService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async searchVideo(title: string, pageToken?: string) {
    const baseUrl = this.configService.getOrThrow<string>('youtubeApiBaseUrl')
    const page = pageToken ? `&pageToken=${pageToken}` : ''
    const apiKey = this.configService.getOrThrow<string>('youtubeApiKey')
    const resp = await this.httpService.axiosRef.get(
      `${baseUrl}/search?q=${title}&type=video&maxResults=25&videoEmbeddable=true&part=snippet${page}`,
      { headers: { 'x-goog-api-key': apiKey } }
    )
    return resp.data
  }

  async getVidById(id: string) {
    const baseUrl = this.configService.getOrThrow<string>('youtubeApiBaseUrl')
    const apiKey = this.configService.getOrThrow<string>('youtubeApiKey')
    const resp = await this.httpService.axiosRef.get(
      `${baseUrl}/videos?id=${id}&part=player`,
      { headers: { 'x-goog-api-key': apiKey } }
    )
    return resp.data
  }
}

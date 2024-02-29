import mlc, { ILauncherOptions } from 'minecraft-launcher-core'
import path from 'path'
import fs from 'fs'
import { ipcRenderer } from 'electron'
// import find from 'find-process'

const launcher = {
  startMinecraft: async (): Promise<void> => {
    const { Client, Authenticator } = mlc
    const launcher = new Client()

    const quiltVersionName: string = 'quilt-1.20.1'
    const minecraftDirectory: string = './minecraft'
    const quiltDirectory: string = path.join(minecraftDirectory, 'versions', quiltVersionName)

    if (!fs.existsSync(quiltDirectory)) {
      fs.mkdirSync(quiltDirectory)

      try {
        const response: Response = await fetch(
          'https://meta.quiltmc.org/v3/versions/loader/1.20.1/0.23.1/profile/json'
        )
        const versionData = await response.json()

        fs.writeFileSync(
          path.join(quiltDirectory, `${quiltVersionName}.json`),
          JSON.stringify(versionData)
        )
        console.log('Скачивается')
      } catch (e) {
        console.log(e)
        return
      }
    }

    const opts: ILauncherOptions = {
      authorization: Authenticator.getAuth('w01f'),
      root: minecraftDirectory,
      version: {
        number: '1.20.1',
        type: 'release',
        custom: quiltVersionName
      },
      memory: {
        max: '6G',
        min: '4G'
      },
      javaPath: 'E:/Проекты/MCLauncher/minecraft/jre/bin/javaw.exe'
    }

    launcher.launch(opts)
    // const launchChild = await
    // console.log(launchChild?.pid)

    // const findInterval = setInterval(() => {
    //   return find('pid', launchChild?.pid).then(
    //     (list) => {
    //       console.log(list[0])
    //       clearInterval(findInterval)
    //       ipcRenderer.send('hide-main-windows')
    //     },
    //     (err): unknown => console.log(err)
    //   )
    // }, 1000)

    launcher.on('debug', (e): void => console.log(e))
    launcher.on('data', (e): void => console.log(e))

    ipcRenderer.send('hide-main-windows')
    launcher.on('close', (): void => ipcRenderer.send('show-main-windows'))
  }
}

export const API = {
  launcher: launcher
}

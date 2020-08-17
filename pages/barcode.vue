<template>
  <div>
    <div style="font-size: 48px; font-weight: bold; text-align: center;">
      BARCODE DEMO
    </div>
    <div style="text-align: center; margin-top: 50px;">
      <VueBarCode :value="barcode"></VueBarCode>
      <v-btn style="margin-top: 20px; padding: 10px;" @click="randomNumber()">
        Generate BarCode
      </v-btn>
    </div>
    <v-layout row wrap class="scanner-barcode">
      <v-flex xs12 sm12 md6 style="width: 50vw; text-align: center;">
        <div style="font-size: 32px; font-weight: bold;">
          Scan BarCode From Images
        </div>
        <div
          style="
            width: 300px;
            background-color: grey;
            margin: auto;
            margin-top: 10px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32px;
          "
        >
          {{ barcodeFromImage }}
        </div>
        <img
          id="view-barcode-image"
          style="margin: auto; margin-top: 20px; width: 300px; height: 150px;"
        />
        <div style="text-align: center; margin-top: 20px;" v-if="!uploadButton">
          <label for="barcode-image">Select BarCode Image:</label>
          <input
            type="file"
            id="barcode-image"
            @change="uploadBarCodeImage()"
          />
        </div>
        <div style="text-align: center; margin-top: 20px;" v-else>
          <v-btn @click="remove">Clear</v-btn>
        </div>
      </v-flex>
      <v-flex xs12 sm12 md6 style="width: 50vw; text-align: center;">
        <div style="font-size: 32px; font-weight: bold;">
          Scan Barcode From Devices
        </div>
        <div
          style="
            width: 300px;
            background-color: grey;
            margin: auto;
            margin-top: 10px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32px;
          "
        >
          {{ barcodeFromDevices }}
        </div>
        <nav role="navigation" aria-label="main navigation">
          <div v-if="!scannerActive">
            <v-btn @click="start" style="padding: 10px; margin-top: 20px;">
              Start Scanner
            </v-btn>
          </div>
          <div v-else>
            <v-btn @click="stop" style="padding: 10px; margin-top: 20px;">
              Stop Scanner
            </v-btn>
          </div>
          <div
            id="screen-windows"
            class="video"
            style="margin: auto; margin-top: 20px;"
          ></div>
        </nav>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Quagga from 'quagga'
import { BrowserBarcodeReader } from '@zxing/library'
export default {
  data() {
    return {
      barcode: 0,
      barcodeFromDevices: 0,
      scannerActive: false,
      barcodeFromImage: 0,
      uploadButton: false,
    }
  },
  methods: {
    remove() {
      this.uploadButton = false
      this.barcodeFromImage = 0
      document.getElementById('view-barcode-image').src = ''
      document.getElementById('view-barcode-image').style.display = 'none'
    },
    uploadBarCodeImage() {
      this.uploadButton = true
      let file = document.getElementById('barcode-image').files[0]
      let reader = new FileReader()
      reader.onload = function () {
        document.getElementById('view-barcode-image').src = reader.result
         document.getElementById('view-barcode-image').style.display = 'block'
      }
      reader.readAsDataURL(file)
      const codeReader = new BrowserBarcodeReader()

      const img = document.getElementById('view-barcode-image')
      codeReader
        .decodeFromImage(img)
        .then((result) => {
          console.log(result)
          this.barcodeFromImage = result.text
        })
        .catch((err) => {
          console.error(err)
          this.barcodeFromImage = 0
        })
    },
    randomNumber() {
      this.barcode = Math.floor(Math.random() * 999999) + 100000
    },
    start() {
      this.barcodeFromDevices = 0
      this.scannerActive = true
      document.querySelector('#screen-windows').style.display = 'block'
      const config = {
        inputStream: {
          name: 'live',
          type: 'LiveStream',
          target: document.querySelector('#screen-windows'),
          constraints: {
            width: 500,
            height: 200,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
          ],
          multiple: true,
        },
        locator: {
          halfSample: true,
          patchSize: 'medium',
        },
      }

      Quagga.init(config, (err) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('Initialization Complete')
        Quagga.start()
      })
    },
    stop() {
      this.scannerActive = false
      document.querySelector('#screen-windows').style.display = 'none'
      this.barcodeFromDevices = 0
      Quagga.stop()
    },
  },
  mounted() {
    Quagga.onDetected((data) => {
      const foundResult = data[0]
      const foundCode = {
        code: foundResult.codeResult?.code,
      }
      this.barcodeFromDevices = foundCode?.code
      this.scannerActive = false
      document.querySelector('#screen-windows').style.display = 'none'
      Quagga.stop()
    })

    document.getElementById('view-barcode-image').style.display = 'none'
  },
}
</script>

<style scoped>
.scanner-barcode {
  display: inline-flex;
  margin-top: 100px;
}
</style>

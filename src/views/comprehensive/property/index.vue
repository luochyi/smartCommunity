<template>
  <div>
    <div class="dev_box">
      <div class="dev_left">
        <div class="dev_box_title">
          <p>异常事件 <span>Abnormal events</span></p>
        </div>
        <div class="dev_card">
          <div class="left_img">
            <img :src="card_left1"
                 alt="">
          </div>
          <div style="flex:1">
            <p style="font-size: 8px; line-height: 26px;">已结束事件</p>
            <p style="font-size: 6px; opacity: 0.5;">Finished event</p>
          </div>
          <div style="font-size: 8px; line-height: 52px;">
            <p>2,120条></p>
          </div>
        </div>
        <div class="dev_card">
          <div class="left_img">
            <img :src="card_left2"
                 alt="">
          </div>
          <div style="flex:1">
            <p style="font-size: 8px; line-height: 26px;">未开始事件</p>
            <p style="font-size: 6px; opacity: 0.5;">Ngoing event</p>
          </div>
          <div style="font-size: 8px; line-height: 52px;">
            <p>5,100条></p>
          </div>
        </div>
        <div class="dev_card">
          <div class="left_img">
            <img :src="card_left3"
                 alt="">
          </div>
          <div style="flex:1">
            <p style="font-size: 8px; line-height: 26px;">进行中事件</p>
            <p style="font-size: 6px; opacity: 0.5;">Finished event</p>
          </div>
          <div style="font-size: 8px; line-height: 52px;">

            <p>5,100条></p>
          </div>
        </div>
        <div class="dev_card">
          <table data-v-4e67b0e2="">
            <tr data-v-4e67b0e2=""
                style="margin-bottom: 15px;">
              <th data-v-4e67b0e2=""
                  style="width: 300px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">发生时间
              </th>
              <th data-v-4e67b0e2=""
                  style="width: 150px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">管理区
              </th>
              <th data-v-4e67b0e2=""
                  style="width: 200px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">事件描述
              </th>
              <th data-v-4e67b0e2=""
                  style="width: 200px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">操作</th>
            </tr>
            <tbody data-v-4e67b0e2=""
                   style="margin-top: 15px;">
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-15 14:56</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">华茂悦锋</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">乱踩花坛</td>
                <td data-v-4e67b0e2=""><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAABiUlEQVQ4T52TvUoDQRDHZ3b2krsThLuzDATRQhCrSCCQlwiCYGlnIwiCrbbmFSzEUq1sFDsrU4S8g6AIWvgVjHeX3R25kJyXEzQ6xbK7M7+ZXWb+CBnj+fniUxAU/SgS2ftk/0zE3kMhhrtWiACc3GGyMIDoVio+2XYhD+XPrJSeUuoJO53+AH6rVGYmAUeJOI7NVLv9iLelmuOXhfdbxbw/CsN3fKnXPYvZGTlRKYF9ngVEmQWM4S641n1aXSmN+SdTpBrAvKiZLwBoGGuYEDe1LdezCb/BGOoVBlBg01k2UIS6aWza+RMsPvQRMNwYl3bz//6xMoX6EgrYMO9xIKS1rR3amqiyjOIrbVkb7Mr9BBA9fWJcWv0FVmsI+GpsOqdQHzDDKTMsILJvHLk3Br8s1T1r+qtVshv5RsqmQHPIotBhrWrI0AWCOV2k47FWcank9Mrl/w3JYLar1aBnWcVJpywdz1QY1apHEyRwmVXnOnpehqEw0n+MJKnUQDBjJiWDEH1ofUnyE7gowelpX6QyAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAABvElEQVQ4T7VTy27TQBQ9d8aO7dpqcYLEJigSFIkWVaoUFAkpLOEjkOAPWPABLPkGHkv4ANbwARRRZVepILUbYAMSTSAhje3xHGRDjBMWzYa7GM3cmXPvGd1zBLXg5qZ30mp5zSRR9XyxH2rN+Esjxee9mQAsclIsBNS4221q328sg5bPNCYPjTmRwSArwT+63fOrAOeFmKY23N//Kp/aN4JmR8VndVy+T2aznzLq92OXDIrLU2tFjFEfM+5MiScAE0C8QOFBx5F3dBwbKFX+t6AvdcqH4/ROovgQJEF8hyAB4UFhHRTtIX+0Fa29mLNYABfJogCA7JJrX4rnCZOEx1Zugbi4HXrP6vT/AX+YZHct6FrYczlwWwOvFdU3iPW3Iv/pmWDSaKuwkVN2lWCgcz2iysP/Cz6cpPeQ20xpGea0l5XoI1iGueKFa5H/eIH2aKcfu+u/R1XE+8npzRTqvgbfCiAEaCFdF/L8atR4VQmlGBXb7WDa6SyI5HiabhPcqB5ajq9E/kG9aymScuC9Xmvqut6qKqvkWRmj14v1CgXWSDN4kwyv448xKnpzSxpTMloIxyGUyrD315K/AF0c3+lB+rAzAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 20px;">
                  <!---->
                  <!---->
                </td>
              </tr>
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-10 15:32</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">甬城楼</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">偷井盖</td>
                <td data-v-4e67b0e2="">
                  <!---->
                  <!----><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABiUlEQVQ4T5WTv09TURTHP+fe915roY0CadCV3b+AwZnBQEghbAwmjgzsGBMT4y4Du5ONg2iiIQQW/gcHJgcNAyEEKKXtveeYR3hNUWLLnW7O+X7OuT++RyiWmTSajFEjS0q40Eb6OSBkaKVLr3tBq7kkMc9dC57tW/I4MmmKHwTu2ncV82ecNpekLZjJyjZ1ezAcLIoliv34ybE0Ptq4f0htWMe/81G5ksZ3m/COcpEUx1PnWBflN+4mqmDCRIy8LHSxh8rKF5uyEln/SCkNNdoa+DrYLfG8DpFXg7F/YO9ZNAga+ZwLfcI8kVM1fhkcjgynni2FHYQpII2B9yPBTtjDWAuRNzmQJHwKgcX/wi5hGWjld/aeD2K8VWHawVyIrN+CF3ZtsqSU+g/mmDHHhiqbBA5dygscxxj1GHhX6HKzyPMDq1Yuqd73nzuOTm4SH2vUM3fby8OKHaWcXHt7dd/KZx0ejVrgssL59qyc9ycnH44nLapWJrtrQGKKhkjvqsvFtznp5E3/AIzOqj1EobeOAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABxElEQVQ4T7VTS2sTURT+zrnziMlMmpqSGqEgaPctuFQQhS66EFykUERx4S9ypT9Bs2sXigS66UqrLgWJC3FTmlja5j1z7zkyhYQJBOrGu7p8j/OA7xCmT5UaTZRQRuCFYDsCzTgANoAUE6RJH4PmDrmMuxQ8OFCv7lBVgckbFv0TgZoLnDV3aERQpd091PTa1cZpMU+g33+hS413GpkKyvkubnhasefdp0zMDqIUVd6GUa0zpxGMqfFBrxtGISOSP7/vajragsiGQkvM/FNF1jTbj81n9oKWv3LrU6Z1KYR293VFQwQZoP1eZAfHLx0wDv1433rEalXYnT90jtaCqP6Korg/nWDOnIGjTvuZp0JEZK2VTTbeV8CBhMv+jTtv8qMvNPsixiotQd0GiL94TGcqVPrP5pMfzw1ISMmKuE1m+gZmdaLLhdX113NjP2lpNRSEUzDptrc1dVvkeS0mIVFWse6+YTryV9ebM51A6fGhxsUh4nzFpNN+BNX6DDN8ElRvf8xrJoxJFhLjyqgFPJ/lq2J67OP0MtsvDrRwMcHyvxYYFtHbu0e92eVkx3FzgFgLCBYdiPMh1iEdJ+i/36ZJ1vQvl7HlPan3j2AAAAAASUVORK5CYII="
                       alt=""
                       style="margin-left: 20px;">
                </td>
              </tr>
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-09 15:32</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">金茂府</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">漏电</td>
                <td data-v-4e67b0e2="">
                  <!---->
                  <!----><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABiUlEQVQ4T5WTv09TURTHP+fe915roY0CadCV3b+AwZnBQEghbAwmjgzsGBMT4y4Du5ONg2iiIQQW/gcHJgcNAyEEKKXtveeYR3hNUWLLnW7O+X7OuT++RyiWmTSajFEjS0q40Eb6OSBkaKVLr3tBq7kkMc9dC57tW/I4MmmKHwTu2ncV82ecNpekLZjJyjZ1ezAcLIoliv34ybE0Ptq4f0htWMe/81G5ksZ3m/COcpEUx1PnWBflN+4mqmDCRIy8LHSxh8rKF5uyEln/SCkNNdoa+DrYLfG8DpFXg7F/YO9ZNAga+ZwLfcI8kVM1fhkcjgynni2FHYQpII2B9yPBTtjDWAuRNzmQJHwKgcX/wi5hGWjld/aeD2K8VWHawVyIrN+CF3ZtsqSU+g/mmDHHhiqbBA5dygscxxj1GHhX6HKzyPMDq1Yuqd73nzuOTm4SH2vUM3fby8OKHaWcXHt7dd/KZx0ejVrgssL59qyc9ycnH44nLapWJrtrQGKKhkjvqsvFtznp5E3/AIzOqj1EobeOAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABxElEQVQ4T7VTS2sTURT+zrnziMlMmpqSGqEgaPctuFQQhS66EFykUERx4S9ypT9Bs2sXigS66UqrLgWJC3FTmlja5j1z7zkyhYQJBOrGu7p8j/OA7xCmT5UaTZRQRuCFYDsCzTgANoAUE6RJH4PmDrmMuxQ8OFCv7lBVgckbFv0TgZoLnDV3aERQpd091PTa1cZpMU+g33+hS413GpkKyvkubnhasefdp0zMDqIUVd6GUa0zpxGMqfFBrxtGISOSP7/vajragsiGQkvM/FNF1jTbj81n9oKWv3LrU6Z1KYR293VFQwQZoP1eZAfHLx0wDv1433rEalXYnT90jtaCqP6Korg/nWDOnIGjTvuZp0JEZK2VTTbeV8CBhMv+jTtv8qMvNPsixiotQd0GiL94TGcqVPrP5pMfzw1ISMmKuE1m+gZmdaLLhdX113NjP2lpNRSEUzDptrc1dVvkeS0mIVFWse6+YTryV9ebM51A6fGhxsUh4nzFpNN+BNX6DDN8ElRvf8xrJoxJFhLjyqgFPJ/lq2J67OP0MtsvDrRwMcHyvxYYFtHbu0e92eVkx3FzgFgLCBYdiPMh1iEdJ+i/36ZJ1vQvl7HlPan3j2AAAAAASUVORK5CYII="
                       alt=""
                       style="margin-left: 20px;">
                </td>
              </tr>
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-05 12:20</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">华侨城</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">违章自建</td>
                <td data-v-4e67b0e2="">
                  <!---->
                  <!----><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABiUlEQVQ4T5WTv09TURTHP+fe915roY0CadCV3b+AwZnBQEghbAwmjgzsGBMT4y4Du5ONg2iiIQQW/gcHJgcNAyEEKKXtveeYR3hNUWLLnW7O+X7OuT++RyiWmTSajFEjS0q40Eb6OSBkaKVLr3tBq7kkMc9dC57tW/I4MmmKHwTu2ncV82ecNpekLZjJyjZ1ezAcLIoliv34ybE0Ptq4f0htWMe/81G5ksZ3m/COcpEUx1PnWBflN+4mqmDCRIy8LHSxh8rKF5uyEln/SCkNNdoa+DrYLfG8DpFXg7F/YO9ZNAga+ZwLfcI8kVM1fhkcjgynni2FHYQpII2B9yPBTtjDWAuRNzmQJHwKgcX/wi5hGWjld/aeD2K8VWHawVyIrN+CF3ZtsqSU+g/mmDHHhiqbBA5dygscxxj1GHhX6HKzyPMDq1Yuqd73nzuOTm4SH2vUM3fby8OKHaWcXHt7dd/KZx0ejVrgssL59qyc9ycnH44nLapWJrtrQGKKhkjvqsvFtznp5E3/AIzOqj1EobeOAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABxElEQVQ4T7VTS2sTURT+zrnziMlMmpqSGqEgaPctuFQQhS66EFykUERx4S9ypT9Bs2sXigS66UqrLgWJC3FTmlja5j1z7zkyhYQJBOrGu7p8j/OA7xCmT5UaTZRQRuCFYDsCzTgANoAUE6RJH4PmDrmMuxQ8OFCv7lBVgckbFv0TgZoLnDV3aERQpd091PTa1cZpMU+g33+hS413GpkKyvkubnhasefdp0zMDqIUVd6GUa0zpxGMqfFBrxtGISOSP7/vajragsiGQkvM/FNF1jTbj81n9oKWv3LrU6Z1KYR293VFQwQZoP1eZAfHLx0wDv1433rEalXYnT90jtaCqP6Korg/nWDOnIGjTvuZp0JEZK2VTTbeV8CBhMv+jTtv8qMvNPsixiotQd0GiL94TGcqVPrP5pMfzw1ISMmKuE1m+gZmdaLLhdX113NjP2lpNRSEUzDptrc1dVvkeS0mIVFWse6+YTryV9ebM51A6fGhxsUh4nzFpNN+BNX6DDN8ElRvf8xrJoxJFhLjyqgFPJ/lq2J67OP0MtsvDrRwMcHyvxYYFtHbu0e92eVkx3FzgFgLCBYdiPMh1iEdJ+i/36ZJ1vQvl7HlPan3j2AAAAAASUVORK5CYII="
                       alt=""
                       style="margin-left: 20px;">
                </td>
              </tr>
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-03 16:20</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">华侨城</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">树木枯死</td>
                <td data-v-4e67b0e2="">
                  <!---->
                  <!----><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABiUlEQVQ4T5WTv09TURTHP+fe915roY0CadCV3b+AwZnBQEghbAwmjgzsGBMT4y4Du5ONg2iiIQQW/gcHJgcNAyEEKKXtveeYR3hNUWLLnW7O+X7OuT++RyiWmTSajFEjS0q40Eb6OSBkaKVLr3tBq7kkMc9dC57tW/I4MmmKHwTu2ncV82ecNpekLZjJyjZ1ezAcLIoliv34ybE0Ptq4f0htWMe/81G5ksZ3m/COcpEUx1PnWBflN+4mqmDCRIy8LHSxh8rKF5uyEln/SCkNNdoa+DrYLfG8DpFXg7F/YO9ZNAga+ZwLfcI8kVM1fhkcjgynni2FHYQpII2B9yPBTtjDWAuRNzmQJHwKgcX/wi5hGWjld/aeD2K8VWHawVyIrN+CF3ZtsqSU+g/mmDHHhiqbBA5dygscxxj1GHhX6HKzyPMDq1Yuqd73nzuOTm4SH2vUM3fby8OKHaWcXHt7dd/KZx0ejVrgssL59qyc9ycnH44nLapWJrtrQGKKhkjvqsvFtznp5E3/AIzOqj1EobeOAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABxElEQVQ4T7VTS2sTURT+zrnziMlMmpqSGqEgaPctuFQQhS66EFykUERx4S9ypT9Bs2sXigS66UqrLgWJC3FTmlja5j1z7zkyhYQJBOrGu7p8j/OA7xCmT5UaTZRQRuCFYDsCzTgANoAUE6RJH4PmDrmMuxQ8OFCv7lBVgckbFv0TgZoLnDV3aERQpd091PTa1cZpMU+g33+hS413GpkKyvkubnhasefdp0zMDqIUVd6GUa0zpxGMqfFBrxtGISOSP7/vajragsiGQkvM/FNF1jTbj81n9oKWv3LrU6Z1KYR293VFQwQZoP1eZAfHLx0wDv1433rEalXYnT90jtaCqP6Korg/nWDOnIGjTvuZp0JEZK2VTTbeV8CBhMv+jTtv8qMvNPsixiotQd0GiL94TGcqVPrP5pMfzw1ISMmKuE1m+gZmdaLLhdX113NjP2lpNRSEUzDptrc1dVvkeS0mIVFWse6+YTryV9ebM51A6fGhxsUh4nzFpNN+BNX6DDN8ElRvf8xrJoxJFhLjyqgFPJ/lq2J67OP0MtsvDrRwMcHyvxYYFtHbu0e92eVkx3FzgFgLCBYdiPMh1iEdJ+i/36ZJ1vQvl7HlPan3j2AAAAAASUVORK5CYII="
                       alt=""
                       style="margin-left: 20px;">
                </td>
              </tr>
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-03 16:20</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">华侨城</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">灯泡损坏</td>
                <td data-v-4e67b0e2="">
                  <!---->
                  <!----><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABiUlEQVQ4T5WTv09TURTHP+fe915roY0CadCV3b+AwZnBQEghbAwmjgzsGBMT4y4Du5ONg2iiIQQW/gcHJgcNAyEEKKXtveeYR3hNUWLLnW7O+X7OuT++RyiWmTSajFEjS0q40Eb6OSBkaKVLr3tBq7kkMc9dC57tW/I4MmmKHwTu2ncV82ecNpekLZjJyjZ1ezAcLIoliv34ybE0Ptq4f0htWMe/81G5ksZ3m/COcpEUx1PnWBflN+4mqmDCRIy8LHSxh8rKF5uyEln/SCkNNdoa+DrYLfG8DpFXg7F/YO9ZNAga+ZwLfcI8kVM1fhkcjgynni2FHYQpII2B9yPBTtjDWAuRNzmQJHwKgcX/wi5hGWjld/aeD2K8VWHawVyIrN+CF3ZtsqSU+g/mmDHHhiqbBA5dygscxxj1GHhX6HKzyPMDq1Yuqd73nzuOTm4SH2vUM3fby8OKHaWcXHt7dd/KZx0ejVrgssL59qyc9ycnH44nLapWJrtrQGKKhkjvqsvFtznp5E3/AIzOqj1EobeOAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABxElEQVQ4T7VTS2sTURT+zrnziMlMmpqSGqEgaPctuFQQhS66EFykUERx4S9ypT9Bs2sXigS66UqrLgWJC3FTmlja5j1z7zkyhYQJBOrGu7p8j/OA7xCmT5UaTZRQRuCFYDsCzTgANoAUE6RJH4PmDrmMuxQ8OFCv7lBVgckbFv0TgZoLnDV3aERQpd091PTa1cZpMU+g33+hS413GpkKyvkubnhasefdp0zMDqIUVd6GUa0zpxGMqfFBrxtGISOSP7/vajragsiGQkvM/FNF1jTbj81n9oKWv3LrU6Z1KYR293VFQwQZoP1eZAfHLx0wDv1433rEalXYnT90jtaCqP6Korg/nWDOnIGjTvuZp0JEZK2VTTbeV8CBhMv+jTtv8qMvNPsixiotQd0GiL94TGcqVPrP5pMfzw1ISMmKuE1m+gZmdaLLhdX113NjP2lpNRSEUzDptrc1dVvkeS0mIVFWse6+YTryV9ebM51A6fGhxsUh4nzFpNN+BNX6DDN8ElRvf8xrJoxJFhLjyqgFPJ/lq2J67OP0MtsvDrRwMcHyvxYYFtHbu0e92eVkx3FzgFgLCBYdiPMh1iEdJ+i/36ZJ1vQvl7HlPan3j2AAAAAASUVORK5CYII="
                       alt=""
                       style="margin-left: 20px;">
                </td>
              </tr>
              <tr data-v-4e67b0e2="">
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">2020-05-03 16:20</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">华侨城</td>
                <td data-v-4e67b0e2=""
                    style="font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 50px; padding-left: 20px; box-sizing: border-box;">打翻琉璃盏</td>
                <td data-v-4e67b0e2="">
                  <!---->
                  <!----><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABiUlEQVQ4T5WTv09TURTHP+fe915roY0CadCV3b+AwZnBQEghbAwmjgzsGBMT4y4Du5ONg2iiIQQW/gcHJgcNAyEEKKXtveeYR3hNUWLLnW7O+X7OuT++RyiWmTSajFEjS0q40Eb6OSBkaKVLr3tBq7kkMc9dC57tW/I4MmmKHwTu2ncV82ecNpekLZjJyjZ1ezAcLIoliv34ybE0Ptq4f0htWMe/81G5ksZ3m/COcpEUx1PnWBflN+4mqmDCRIy8LHSxh8rKF5uyEln/SCkNNdoa+DrYLfG8DpFXg7F/YO9ZNAga+ZwLfcI8kVM1fhkcjgynni2FHYQpII2B9yPBTtjDWAuRNzmQJHwKgcX/wi5hGWjld/aeD2K8VWHawVyIrN+CF3ZtsqSU+g/mmDHHhiqbBA5dygscxxj1GHhX6HKzyPMDq1Yuqd73nzuOTm4SH2vUM3fby8OKHaWcXHt7dd/KZx0ejVrgssL59qyc9ycnH44nLapWJrtrQGKKhkjvqsvFtznp5E3/AIzOqj1EobeOAAAAAElFTkSuQmCC"
                       alt=""
                       style="margin-left: 15px;"><img data-v-4e67b0e2=""
                       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABxElEQVQ4T7VTS2sTURT+zrnziMlMmpqSGqEgaPctuFQQhS66EFykUERx4S9ypT9Bs2sXigS66UqrLgWJC3FTmlja5j1z7zkyhYQJBOrGu7p8j/OA7xCmT5UaTZRQRuCFYDsCzTgANoAUE6RJH4PmDrmMuxQ8OFCv7lBVgckbFv0TgZoLnDV3aERQpd091PTa1cZpMU+g33+hS413GpkKyvkubnhasefdp0zMDqIUVd6GUa0zpxGMqfFBrxtGISOSP7/vajragsiGQkvM/FNF1jTbj81n9oKWv3LrU6Z1KYR293VFQwQZoP1eZAfHLx0wDv1433rEalXYnT90jtaCqP6Korg/nWDOnIGjTvuZp0JEZK2VTTbeV8CBhMv+jTtv8qMvNPsixiotQd0GiL94TGcqVPrP5pMfzw1ISMmKuE1m+gZmdaLLhdX113NjP2lpNRSEUzDptrc1dVvkeS0mIVFWse6+YTryV9ebM51A6fGhxsUh4nzFpNN+BNX6DDN8ElRvf8xrJoxJFhLjyqgFPJ/lq2J67OP0MtsvDrRwMcHyvxYYFtHbu0e92eVkx3FzgFgLCBYdiPMh1iEdJ+i/36ZJ1vQvl7HlPan3j2AAAAAASUVORK5CYII="
                       alt=""
                       style="margin-left: 20px;">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dev_box_title">
          <p>工单分类 <span>Work order classification</span></p>
        </div>
        <div class="dev_card">
          <div class="work_order">
            <div class="left">
              <div>
                <span class='text'>居民建议</span>
                <span class='percentage'>52%</span>
              </div>
              <div>
                <span class='text'>小区整改</span>
                <span class='percentage'>18%</span>
              </div>
              <div>
                <span class='text'>物业投诉</span>
                <span class='percentage'>30%</span>
              </div>
            </div>
            <div class='hr'>

            </div>
            <div class="right">
              <div>
                <img :src="work_order"
                     alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="dev_box_title">
          <p>绿化占比 <span>Proportion of greening</span></p>
        </div>
        <div class="dev_card">
          <div class="work_order ">
            <div class="left">
              <div class='Proportion_txt'>
                <span>小区绿化占比</span>
                <p><span>占比</span>35%</p>
              </div>
            </div>
            <div class='hr'>
            </div>
            <div class="right">
              <div>
                <!-- <img :src="work_order"
                     alt=""> -->
                <div class="echarts_init"
                     ref="proportion"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 绿化占比  -->
      </div>
      <div class="dev_right">
        <div class="dev_Occupancy">
          <div class='dev_all'>
            <div class="dev_box_title">
              <p>入住情况 <span>Occupancy</span></p>
            </div>
            <div class="dev_card">
              <div class='all_box'>
                <span>153,212</span>
                <p>全部人数
                </p>
              </div>
            </div>
          </div>
          <div class="dev_pop">
            <div class="dev_External">
              <div class="dev_External_title">
                <div class='left'>
                  <p class='p1'>外来人口 </p>
                  <p class='p2'>External population</p>
                </div>
                <div class="right">
                  <span>8663</span>
                </div>
              </div>
              <div style='width: 100%;'>
                <img style='width: 100%;'
                     src="http://city.oa00.com/img/echarts-3.3c4967b9.png"
                     alt="">
              </div>
            </div>
            <div class="dev_External">
              <div class="dev_External_title">
                <div class='left'>
                  <p class='p1'>华侨 </p>
                  <p class='p2'>Overseas Chinese</p>
                </div>
                <div class="right">
                  <span>734</span>
                </div>
              </div>
              <div style='width: 100%;'>
                <img style='width: 100%;'
                     src="http://city.oa00.com/img/echarts-2.e5e94ed2.png"
                     alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="dev_Community">
          <div class="dev_box_title">
            <p>小区活动 <span>Community activities</span></p>
          </div>
          <div class="dev_card">
            <div class="dev_table">
              <table data-v-4e67b0e2="">
                <tr data-v-4e67b0e2=""
                    style="margin-bottom: 15px;">
                  <th data-v-4e67b0e2=""
                      style="width: 300px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 30px; padding-left: 20px; box-sizing: border-box;">
                    活动时间</th>
                  <th data-v-4e67b0e2=""
                      style="width: 150px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 30px; padding-left: 20px; box-sizing: border-box;">
                    参与人数</th>
                  <th data-v-4e67b0e2=""
                      style="width: 200px; text-align: left; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 30px; padding-left: 20px; box-sizing: border-box;">
                    活动名称</th>
                </tr>
                <tbody data-v-4e67b0e2=""
                       style="margin-top: 15px;">
                  <tr data-v-4e67b0e2="">
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">2020-05-15 14:56</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">32</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px; color: rgb(7, 209, 12);">厨艺比赛
                    </td>
                  </tr>
                  <tr data-v-4e67b0e2="">
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">2020-05-10 15:32</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">25</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px; color: rgb(7, 209, 12);">关爱老人
                    </td>
                  </tr>
                  <tr data-v-4e67b0e2="">
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">2020-05-09 15:32</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">65</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px; color: rgb(7, 209, 12);">我是小棋手
                    </td>
                  </tr>
                  <tr data-v-4e67b0e2="">
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">2020-05-05 12:20</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">65</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px; color: rgb(7, 209, 12);">健康讲座
                    </td>
                  </tr>
                  <tr data-v-4e67b0e2="">
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">2020-05-03 16:20</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px;">36</td>
                    <td data-v-4e67b0e2=""
                        style="padding-left: 20px; box-sizing: border-box; font-size: 6px; font-family: &quot;PingFang SC&quot;; font-weight: 400; line-height: 55px; color: rgb(7, 209, 12);">乒乓球比赛
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="echarts_box">
          <div class="dev_box_title">
            <p>能源耗损 <span>Energy consumption</span></p>
          </div>
          <div class="echarts_content">
            <div class="echarts_init"
                 ref="chart"></div>
          </div>

          <div class="dev_box_title">
            <p>车位占有率 <span> Occupancy rate of parking space </span></p>
          </div>
          <div class="echarts_content">
            <div class="parking">
              <el-progress :text-inside="true"
                           :stroke-width="34"
                           :percentage="50"
                           status="warning"></el-progress>
              <div data-v-4e67b0e2=""
                   style="font-size: 8px; width: 90px; height: 30px; line-height: 30px; float: left; margin-left: 25%;">剩余车位359</div>
              <div data-v-4e67b0e2=""
                   style="font-size: 8px; width: 90px; height: 30px; line-height: 30px; margin-right: 10%; float: right;">全部车位1652</div>
            </div>
          </div>
          <div class="echarts_content"
               style="margin:20px 0;">
            <div class="car">
              <div class='parking1'>
                <div>
                  <p class="p1">11,200辆</p>
                  <p class="p2">月租车数量</p>
                </div>
                <div class="echarts_init"
                     ref="chart3"></div>
              </div>
              <div class='parking1'>
                <div>
                  <p class="p1">6,133辆
                  </p>
                  <p class="p2">临时车数量
                  </p>
                </div>
                <div class="echarts_init"
                     ref="chart4"></div>
              </div>
            </div>
          </div>
          <div class="dev_box_title">
            <p>政务数量 <span> Number of government affairs </span></p>
          </div>
          <div class="echarts_content">
            <div class="echarts_init"
                 ref="chart2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
const echarts = require('echarts')
export default {
  data() {
    return {
      card_left1: require('@/assets/images/develop/card_left1.png'),
      card_left2: require('@/assets/images/develop/card_left2.png'),
      card_left3: require('@/assets/images/develop/card_left3.png'),
      work_order: require('@/assets/images/develop/work_order.png'),
      tableData: [
        {
          data: '2020-05-15 14:56',
          area: '',
          description: '',
          operating: '',
        },
      ],
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      // 能源
      let myChart = echarts.init(this.$refs.chart)
      //   政务数量
      let myChart2 = echarts.init(this.$refs.chart2)
      let myChart3 = echarts.init(this.$refs.chart3)
      let myChart4 = echarts.init(this.$refs.chart4)
      //   绿化
      let proChart = echarts.init(this.$refs.proportion)
      proChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} {c} ({d}%)',
        },
        series: [
          {
            name: '绿化占比',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                formatter: '{d}%',
                fontWeight: 'bold',
                color: ['rgba(255,255,255,1)'],
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 65,
                name: '未绿化',
                itemStyle: {
                  normal: {
                    color: ['rgba(49 57 65/1)'],
                  },
                },
              },
              {
                value: 35,
                name: '绿化完成',
                itemStyle: {
                  normal: {
                    color: ['rgb(67 227 68)'],
                  },
                },
              },
            ],
          },
        ],
      })
      // 临时停放车辆
      myChart4.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> {c} ({d}%)',
        },
        series: [
          {
            name: '临时停放车辆',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                formatter: '{d}%',
                fontWeight: 'bold',
                color: ['rgba(255,255,255,1)'],
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 6133,
                name: '临时停放车辆',
                itemStyle: {
                  normal: {
                    // rgb(189 106 247)
                    color: ['rgba(77 120 254 / 1)'],
                  },
                },
              },
              {
                value: 6917,
                name: '非临时停放车辆',
                itemStyle: {
                  normal: {
                    // rgb(189 106 247)
                    color: ['rgba(49 57 65/1)'],
                  },
                },
              },
            ],
          },
        ],
      })
      myChart3.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/> {c} ({d}%)',
        },
        series: [
          {
            name: '租车辆数',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                formatter: '{d}%',
                fontWeight: 'bold',
                color: ['rgba(255,255,255,1)'],
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 11200,
                name: '月租车数量',
                itemStyle: {
                  normal: {
                    // rgb(189 106 247)
                    color: ['rgba(189 106 244 / 1)'],
                  },
                },
              },
              {
                value: 4800,
                name: '非月租车数量',
                itemStyle: {
                  normal: {
                    // rgb(189 106 247)
                    color: ['rgba(49 57 65/1)'],
                  },
                },
              },
            ],
          },
        ],
      })
      myChart2.setOption({
        color: ['rgba(255,255,255,1)'],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '政务数量',
            type: 'bar',
            barWidth: '30%',
            data: [1000, 5200, 12100, 27000, 24003, 18030, 21022],
          },
        ],
      })
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#fffff',
            },
          },
        },
        legend: {
          textStyle: {
            fontSize: 12, //字体大小
            color: '#ffffff', //字体颜色
          },
          data: ['电量', '水量'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: ['09:00', '13:00', '17:00', '21:00', '01:00', '05:00'],
            axisLabel: {
              show: true,
              interval: 0, //横轴信息全部显示
              rotate: 30, //-30度角倾斜显示
              textStyle: {
                color: '#ffffff',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '电量',
            type: 'line',
            smooth: true,
            stack: '总量',
            areaStyle: {
              normal: {
                color: '#23a287', //改变区域颜色
              },
            },
            lineStyle: {
              color: '#1ad4ae', //改变折线颜色
            },
            itemStyle: { normal: { label: { show: false } } },
            data: [30894, 36894, 23894, 25894, 16894, 26894],
          },
          {
            name: '水量',
            type: 'line',
            smooth: true,
            stack: '总量',
            itemStyle: { normal: { label: { show: false } } },
            label: {},
            areaStyle: {
              normal: {
                color: '#4c88b5', //改变区域颜色
              },
            },
            lineStyle: {
              color: '#4ca5e6', //改变折线颜色
            },
            data: [21093, 26530, 17923, 8723, 5792, 21593],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang='scss'>
.dev_box {
  width: 100vw;
  height: calc(100vh - 60px);
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  color: #ffffff;
  background-color: #202020;
  display: flex;
  div {
    box-sizing: border-box;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .dev_box_title {
    p {
      margin-top: 0px;
      margin-bottom: 10px;
      font-size: 16px;
    }
    span {
      font-size: 6px;
    }
  }
  .dev_card {
    box-sizing: border-box;
    padding: 16px 20px;
    border: 1px solid #323232;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #2a2a2a;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .dev_left {
    width: 40%;
    margin-right: 37.5px;
    height: 100%;
    .left_img {
      width: 52px;
      height: 52px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .work_order {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      .left {
        width: 50%;
        div {
          padding-left: 15%;
          padding-right: 30%;
          display: flex;
          justify-content: space-between;
          .text {
            font-size: 7px;
            font-family: 'Adobe Heiti Std';
            font-weight: normal;
            line-height: 40px;
          }
          .percentage {
            font-size: 20px;
            font-family: DIN;
            font-weight: 500;
            line-height: 40px;
          }
        }
        .Proportion_txt {
          display: block;
          padding-left: 20%;
          span {
            font-size: 7px;
            font-weight: normal;
            line-height: 40px;
          }
          p {
            font-size: 36px;
            font-family: DIN;
            font-weight: 500;
          }
        }
      }
      .hr {
        background: hsla(0, 0%, 100%, 0.1);
        width: 1px;
        height: 274px;
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: center;
        img {
          width: 100%;
        }
        .echarts_init {
          width: 137px;
          height: 137px;
        }
      }
    }
  }
  .dev_right {
    width: 55%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100%;
    .dev_card {
      border-radius: 15px;
      margin-bottom: 0;
    }
    .dev_Occupancy {
      width: 48%;
      .dev_all {
        .dev_card {
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          .all_box {
            text-align: center;
            span {
              font-size: 35px;
              font-family: DIN;
              font-weight: 500;
            }
            p {
              text-align: right;
              font-size: 7px;
              font-family: 'PingFang SC';
              font-weight: 400;
            }
          }
        }
      }
    }
    .dev_pop {
      display: flex;
      justify-content: space-between;
      .dev_External,
      .dev_Overseas {
        width: 48%;
        margin-top: 3%;
        background: #2a2a2a;
        border-radius: 15px;
      }
    }
    .dev_External_title {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 5px 0px 10px 10px;
      line-height: 24px;
      .left {
        flex: 1;
        justify-content: space-between;
        p.p1 {
          font-size: 5px;
          font-family: 'PingFang SC';
          font-weight: 400;
        }
        p.p2 {
          font-size: 4px;
          font-family: 'Adobe Heiti Std';
          font-weight: normal;
        }
      }
      .right {
        float: right;
        font-size: 18px;
        font-family: DIN;
        font-weight: 500;
      }
    }
    .dev_Community {
      width: 48%;
    }
    .echarts_box {
      width: 100%;
      .echarts_content {
        padding: 10px 0;
        background: #2a2a2a;
        box-shadow: 0 18px 30px 0 rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        .echarts_init {
          width: 100%;
          height: 350px;
        }
        .parking {
          width: 80%;
          margin: 0 auto;
          height: 150px;
          padding-top: 50px;
          box-sizing: border-box;
          background: #2a2a2a;
          line-height: 60px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .car {
          display: flex;
          justify-content: space-around;
          .parking1 {
            width: 40%;

            display: flex;
            align-items: center;
            .echarts_init {
              width: 137px;
              height: 137px;
            }
            .p1 {
              margin-top: 10px;
              margin-right: 50px;
              margin-bottom: 5px;
              font-size: 20px;
              font-family: 'Adobe Heiti Std';
              font-weight: normal;
            }
            .p2 {
              font-size: 2px;
              font-family: 'PingFang SC';
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>

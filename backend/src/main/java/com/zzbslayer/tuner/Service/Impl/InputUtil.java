package com.zzbslayer.tuner.Service.Impl;

import com.zzbslayer.tuner.Util.ReturnResult;

import java.util.Scanner;

public class InputUtil {
    private TunerUtil tunerUtil;
    private String realSaite;

    public InputUtil(final TunerUtil tunerUtil) {
        this.tunerUtil = tunerUtil;
    }

    public void setRealSaite(String realSaite) {
        this.realSaite = realSaite;
    }

    public String getRealSaite() {
        return realSaite;
    }

    public ReturnResult run() {
            String saite = getRealSaite();
            double freqMin;
            double freqMax;
            double freqOK;

            if (saite.equals("e1")) {
                freqMin = 77.781;
                freqMax = 87.307;
                freqOK = 82.406;
            } else if (saite.equals("a")) {
                freqMin = 103.826;
                freqMax = 116.540;
                freqOK = 110.0;
            } else if (saite.equals("d")) {
                freqMin = 138.591;
                freqMax = 155.563;
                freqOK = 146.832;
            } else if (saite.equals("g")) {
                freqMin = 184.997;
                freqMax = 207.652;
                freqOK = 195.997;
            } else if (saite.equals("h")) {
                freqMin = 233.081;
                freqMax = 261.625;
                freqOK = 246.941;
            } else {// if (saite.equals("e")) {
                freqMin = 311.126;
                freqMax = 349.228;
                freqOK = 329.627;
            }
            tunerUtil.setFreq(freqMin, freqMax, freqOK);
            try {
                return tunerUtil.run();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
    }
}

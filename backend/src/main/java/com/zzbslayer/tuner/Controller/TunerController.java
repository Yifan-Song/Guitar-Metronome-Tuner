package com.zzbslayer.tuner.Controller;

import com.zzbslayer.tuner.Service.Impl.InputUtil;
import com.zzbslayer.tuner.Service.Impl.TunerUtil;
import com.zzbslayer.tuner.Util.ReturnResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Controller
public class TunerController {
    @PostMapping(value = "/uploadModel")
    @ResponseBody
    public Object uploadModel(HttpServletRequest request){

        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String tune =params.getParameter("tune");

        MultipartFile file = files.get(0);
        if (file.isEmpty()) {
            return "Empty File Error";
        }

        InputStream stream;
        ReturnResult returnResult = null;

        try {

            stream = new BufferedInputStream(file.getInputStream());
            try {
                AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(stream);

                TunerUtil tunerUtil = new TunerUtil(audioInputStream);
                InputUtil inputUtil = new InputUtil(tunerUtil);
                inputUtil.setRealSaite(tune);

                returnResult = inputUtil.run();

            } catch (Exception e2) {
                System.err.println("Error: Unable to start sound data acqusition: " + e2.getLocalizedMessage());
            }


        } catch (Exception e) {
            e.printStackTrace();
        }
        if (returnResult==null)
            return "Processing Error";
        return returnResult;
    }
}

package com.rohg007.android.diseasex.ui;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.util.Patterns;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.rohg007.android.diseasex.R;
import com.rohg007.android.diseasex.utils.Constants;

import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.DialogFragment;

public class UserEntryDialogFragment extends DialogFragment{
    public static final String TAG = "user_entry_fragment";
    public UserEntryDialogFragment(){}

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.user_entry_fragment,container);
        SharedPreferences sharedPreferences = Objects.requireNonNull(getActivity()).getSharedPreferences(Constants.PREFS_KEY, Context.MODE_PRIVATE);
        String email = sharedPreferences.getString("EMAIL","empty");
        String phone = sharedPreferences.getString("PHONE", "empty");
        getDialog().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE);
        EditText emailEdt = v.findViewById(R.id.email_edit_text);
        EditText phoneEdt = v.findViewById(R.id.phone_edit_text);
        TextInputLayout emailLayout = v.findViewById(R.id.email_input_layout);
        TextInputLayout phoneLayout = v.findViewById(R.id.phone_input_layout);

        if(!email.equals("empty"))
            emailEdt.setText(email);
        if(!phone.equals("empty"))
            phoneEdt.setText(phone);
        Button cancelButton = v.findViewById(R.id.cancel_button);
        Button submitButton = v.findViewById(R.id.submit_button);

        cancelButton.setOnClickListener(v1 -> {
            dismiss();
        });

        submitButton.setOnClickListener(v12 -> {
            String mail = emailEdt.getText().toString();
            String number = phoneEdt.getText().toString();
            if(!isValidEmail(mail))
                emailLayout.setError("Not a valid Email");
            else
                emailLayout.setErrorEnabled(false);
            if(!validCellPhone(number))
                phoneLayout.setError("Not a valid Phone Number");
            else
                phoneLayout.setErrorEnabled(false);
            if(isValidEmail(mail) && validCellPhone(number)) {
                SharedPreferences.Editor editor = sharedPreferences.edit();
                editor.putString("EMAIL", mail);
                editor.putString("PHONE", number);
                editor.commit();
                Snackbar.make(emailEdt, "Notification Info Added", Snackbar.LENGTH_SHORT).show();
                dismiss();
            }
        });
        return v;
    }

    private boolean isValidEmail(String email){
        return (!TextUtils.isEmpty(email) && Patterns.EMAIL_ADDRESS.matcher(email).matches());
    }

    private boolean validCellPhone(String number) {
        return (!TextUtils.isEmpty(number) && Patterns.PHONE.matcher(number).matches());
    }

    @Override
    public void onStart() {
        super.onStart();
        int width = ViewGroup.LayoutParams.MATCH_PARENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        getDialog().getWindow().setLayout(width,height);
    }
}
